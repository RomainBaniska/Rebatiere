<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Chamber;
use App\Entity\Reservation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function reservation(): Response
    {
        //Méthode de symfony qui vient d'AbstractController
        // $currentUserId = $this->getUser()->getId();

          return $this->render('reservation/reservationsheet.html.twig', [
            // 'currentUserId' => $currentUserId,
        ]);        
    }

    #[Route('/persistreservation', name: 'app_persistreservation')]
    public function reservationPersist(Request $request, EntityManagerInterface $em): Response
    {

        // Récupérer les valeurs des dates
        $fromValue = $request->request->get('from');
        $toValue = $request->request->get('to');

        // Vérifier si les dates sont fournies et les transformer en DateTime si nécessaire
        $from = !empty($fromValue) ? \DateTime::createFromFormat('d-m-Y', $fromValue) : null;
        $to = !empty($toValue) ? \DateTime::createFromFormat('d-m-Y', $toValue) : null;
        
        $userId = $request->request->getInt('username');
        $chamberId = $request->request->getInt('chambername');
        $privatisation = (bool) $request->request->get('privatisation');

        $user = $em->getRepository(User::class)->find($userId);
        $chamber = $em->getRepository(Chamber::class)->find($chamberId);

        // POUR PERSISTER LA RESERVATION, REMPLIR 6 CONDITIONS

            if ($from === null) {
                $this->addFlash('error', 'Sélectionner une date d\'arrivée');
                return $this->redirectToRoute('app_reservation');
            }

            if ($to === null) {
                $this->addFlash('error', 'Sélectionner une date de départ');
                return $this->redirectToRoute('app_reservation');
            }

            if ($chamber === null) {
                $this->addFlash('error', 'Sélectionner une chambre');
                return $this->redirectToRoute('app_reservation');
            }

            if ($from > $to) {
                $this->addFlash('error', 'La date d\' arrivée est ultérieure à la date de départ');
                return $this->redirectToRoute('app_reservation');
            }

            // La chambre n'est pas pleine sur cette période
            if ($chamber->isChamberFull($from, $to, $em)) {
                $this->addFlash('error', 'La chambre est pleine pour cette période.');
                return $this->redirectToRoute('app_reservation');
            }

            // L'utilisateur n'a pas de réservations qui se chevauchent sur la période 
            $overlappingReservations = $em->getRepository(Reservation::class)->findOverlappingReservations($userId, $from, $to);
            if (count($overlappingReservations) > 0 ) {
                $this->addFlash('error', 'Votre réservation se chevauche avec une de vos autres réservations');
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

        $em->persist($reservation);

        // Ajout de membres supplémentaires lors de la réservation
        $membersData = $request->request->all('members');

        if ($membersData) {
        foreach ($membersData as $username => $data) {

            $subFromValue = $data['from'];
            $subToValue = $data['to'];

            $subFrom = !empty($subFromValue) ? \DateTime::createFromFormat('d-m-Y', $subFromValue) : null;
            $subTo = !empty($subToValue) ? \DateTime::createFromFormat('d-m-Y', $subToValue) : null;
            // $subFrom = new \DateTime($data['from']); 
            // $subTo = new \DateTime($data['to']); 
            $subChamberId = $data['chamber']; 
            $subUserId = $data['id'];

            $subUser = $em->getRepository(User::class)->find($subUserId);
            $subChamber = $em->getRepository(Chamber::class)->find($subChamberId);

            // POUR PERSISTER LA RESERVATION, REMPLIR 6 CONDITIONS

            if ($subFrom === null) {
                $this->addFlash('error', 'Sélectionner une date d\'arrivée pour l\'utilisateur rajouté');
                return $this->redirectToRoute('app_reservation');
            }

            if ($subTo === null) {
                $this->addFlash('error', 'Sélectionner une date de départ pour l\'utilisateur rajouté');
                return $this->redirectToRoute('app_reservation');
            }

            if ($subChamber === null) {
                $this->addFlash('error', 'Sélectionner une chambre pour l\'utilisateur rajouté');
                return $this->redirectToRoute('app_reservation');
            }

            if ($subFrom > $subTo) {
                $this->addFlash('error', 'La date d\' arrivée est ultérieure à la date de départ pour l\'utilisateur rajouté');
                return $this->redirectToRoute('app_reservation');
            }

            // La chambre n'est pas pleine sur cette période
            if ($subChamber->isChamberFull($subFrom, $subFrom, $em)) {
                $this->addFlash('error', 'La chambre est pleine pour cette période pour l\'utilisateur rajouté.');
                return $this->redirectToRoute('app_reservation');
            }

            // L'utilisateur n'a pas de réservations qui se chevauchent sur la période 
            $overlappingReservations = $em->getRepository(Reservation::class)->findOverlappingReservations($subUserId, $subFrom, $subTo);
            if (count($overlappingReservations) > 0 ) {
                $this->addFlash('error', 'les réservations d\'un utilisateur ajouté se chevauchent');
                return $this->redirectToRoute('app_reservation');
            }

            // On va multiplier le nombre de réservations pour afficher les éléments dans le calendar
            $subDates = [];
            $subCurrentDate = clone $subFrom;
            while ($subCurrentDate <= $subTo) {
            $subDates[] = $subCurrentDate->format('Y-m-d');
            $subCurrentDate->modify('+1 day');
            }

            // Créer une réservation pour chaque utilisateur supplémentaire
            $subReservation = new Reservation();
            $subReservation->setStart($subFrom);
            $subReservation->setEnd($subTo);
            $subReservation->setDates($subDates);
            $subReservation->setUsers($subUser);
            $subReservation->setChambers($subChamber);
            $subReservation->setPrivatisation("0");

            $em->persist($subReservation);

            }
        }

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
