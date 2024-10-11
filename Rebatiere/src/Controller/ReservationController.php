<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Chamber;
use App\Entity\Reservation;
// use App\Form\ReservationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Contracts\Cache\CacheInterface;
use App\Service\ChamberService;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function reservation(EntityManagerInterface $em): Response
    {
        //Récupérer l'utilisateur connecté // Méthode de symfony qui vient d'AbstractController
        $currentUser = $this->getUser()->getUsername();
        $currentUserFirstName = $this->getUser()->getFirstname();
        $currentUserLastName = $this->getUser()->getLastname();
        $currentUserId = $this->getUser()->getId();

        // Récupérer la photo pour le header
        $photo = $this->getUser()->getImageFileName();
        if(!$photo) {
            $photo = 'assets/images/defaultavatar.png';
        } else {
            $photo = 'uploads/images/' . $photo;
        }

        // Récupérer la liste de tous les usernames et chambernames
        $users = $em->getRepository(User::class)->findall();
        $chambers = $em->getRepository(Chamber::class)->findall();
        
          return $this->render('reservation/reservationsheet.html.twig', [
            'users' => $users,
            'chambers' => $chambers,
            'currentUserId' => $currentUserId,
            'currentUser' => $currentUser,
            'currentUserFirstName' => $currentUserFirstName,
            'currentUserLastName' => $currentUserLastName,
            // Penser à récupérer User, Firstname & Lastname pour le passer dans le controlleur du header
            'photo' => $photo,
        ]);        
    }

    #[Route('/persistreservation', name: 'app_persistreservation')]
    public function reservationPersist(Request $request, EntityManagerInterface $em, ChamberService $chamberService): Response
    {
        
        $from = new \DateTime($request->request->get('from'));
        $to = new \DateTime($request->request->get('to'));
        $userId = $request->request->getInt('username');
        $privatisation = (bool) $request->request->get('privatisation');

        $chamberName = $request->request->get('chambername');
        $chamberId = $chamberService->getChamberId($chamberName);

        // On charge les objets User et Chamber correspondants pour pas avoir d'erreur d'attendu en BDD
        $user = $em
                ->getRepository(User::class)
                ->find($userId);
        $chamber = $em
                ->getRepository(Chamber::class)
                ->find($chamberId);

            // On vérifie que la date de début n'est pas antérieure à la date de fin
            if ($from >= $to) {
                $this->addFlash('error', 'La date d\' arrivée à la Rebatière est ultérieure à la date de départ, veuillez réessayer');
                return $this->redirectToRoute('app_reservation');
            }

            // Vérifier si la chambre est pleine pour cette période
            if ($chamber->isChamberFull($from, $to, $em)) {
                $this->addFlash('error', 'La chambre est pleine pour cette période.');
                return $this->redirectToRoute('app_reservation');
            }

        // On vérifie si les réservations d'un même utilisateur se chevauchent 
        $overlappingReservations = $em->getRepository(Reservation::class)
        ->findOverlappingReservations($userId, $from, $to);

        if (count($overlappingReservations) > 0 ) {
            $this->addFlash('error', 'Vous tentez de créer une réservation qui en chevauche une autre rendez-vous dans "Mes Réservations"');
            return $this->redirectToRoute('app_reservation');
        }

        // On va multiplier le nombre de réservations pour afficher les éléments dans le calendar
        $dates = [];
        $currentDate = clone $from;
        while ($currentDate <= $to) {
            $dates[] = $currentDate->format('Y-m-d');
            $currentDate->modify('+1 day');
        }

        $reservation = new Reservation();
        $reservation->setStart($from);
        $reservation->setEnd($to);
        $reservation->setDates($dates);
        $reservation->setUsers($user);
        $reservation->setChambers($chamber);
        $reservation->setPrivatisation($privatisation);

        $overlappingReservations = $em->getRepository(Reservation::class)
            ->findOverlappingReservations($userId, $from, $to);

        if (count($overlappingReservations) > 0) {
            $this->addFlash('error', 'Vous tentez de créer une réservation qui en chevauche une autre. Rendez-vous dans "Mes Réservations".');
            return $this->redirectToRoute('app_reservation');
        }

        $em->persist($reservation);
        $em->flush();

        return $this->redirectToRoute('app_home');
    }

    #[Route('/api/reservations', name: 'api_reservations')]
    public function getReservations(EntityManagerInterface $em): JsonResponse
    {
        $reservations = $em->getRepository(Reservation::class)->findAll();

        $events = [];
        foreach ($reservations as $reservation) {
            foreach ($reservation->getDates() as $date) {
                $events[] = [
                    'id' => $reservation->getId(),
                    // 'title' => $reservation->getUsers()->getUsername(),
                    'start' => $date,
                    'end' => $date,
                     'color' => 'transparent',
                    'extendedProps' => [
                        'firstname' => $reservation->getUsers()->getFirstname(),
                        'lastname' => $reservation->getUsers()->getLastname(),
                        'chamber' => $reservation->getChambers()->getChambername(),
                        'privatisation' => $reservation->isPrivatisation(),
                        'debut' => $reservation->getStart()->format('d-m-Y'),
                        'fin' => $reservation->getEnd()->format('d-m-Y'),
                        'dates' => $reservation->getDates(),
                        'icon' => $reservation->getUsers()->getImageFileName() ? '/uploads/images/' . $reservation->getUsers()->getImageFileName() : 'assets/images/defaultavatar.png',
                    ],
                ];
            }
        }
        return new JsonResponse($events);
    }

    #[Route('/api/search-users', name: 'api_search_users', methods: ['GET'])]
    public function searchUsers(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $term = $request->query->get('term', ''); 
        $users = $em->getRepository(User::class)->searchByTerm($term);

        $results = []; 
        foreach ($users as $user) {
            $results[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'firstName' => $user->getFirstname(),
                'lastName' => $user->getLastname(),
            ];
        }

        return new JsonResponse($results); 
    }
}
