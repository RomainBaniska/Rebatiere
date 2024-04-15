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
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function reservation(Request $request, EntityManagerInterface $em): Response
    {

        //Récupérer les from/to (start & end) de la page home
        $from = $request->request->get('from');
        $to = $request->request->get('to');

        //Récupérer l'utilisateur connecté // Méthode de symfony qui vient d'AbstractController
        $currentUser = $this->getUser()->getUsername();

        // Récupérer la liste de tous les usernames et chambernames
        $users = $em->getRepository(User::class)->findall();
        $chambers = $em->getRepository(Chamber::class)->findall();
        
          return $this->render('reservation/reservationsheet.html.twig', [
            'from' => $from,
            'to' => $to,
            'users' => $users,
            'chambers' => $chambers,
            'currentUser' => $currentUser,
            // 'reservationForm' => $reservationForm,
        ]);        
    }

    #[Route('/persistreservation', name: 'app_persistreservation')]
    public function reservationPersist(Request $request, EntityManagerInterface $em): Response
    {

        $allValues = $request->request->all();
        
        $from = new \DateTime($request->request->get('from'));
        $to = new \DateTime($request->request->get('to'));
        $userId = $request->request->getInt('username');
        $chamberId = $request->request->getInt('chambername');
        $privatisation = (bool) $request->request->get('privatisation');

        // On charge les objets User et Chamber correspondants pour pas avoir d'erreur d'attendu en BDD
        $user = $em
                ->getRepository(User::class)
                ->find($userId);
        $chamber = $em
                ->getRepository(Chamber::class)
                ->find($chamberId);

        // Nouvelle instance de l'entité Réservation
        $reservation = new Reservation();
        $reservation->setStart($from);
        $reservation->setEnd($to);
        $reservation->setUsers($user);
        $reservation->setChambers($chamber);
        $reservation->setPrivatisation($privatisation);

        $em->persist($reservation);
        $em->flush();

        return $this->redirectToRoute('app_home');
    }

    #[Route('/testrelation', name: 'app_testrelation')]
    public function testRelation(EntityManagerInterface $em)
{
   // Récupérer toutes les réservations avec les utilisateurs et les chambres associés
   $reservations = $em->getRepository(Reservation::class)->findAll();

   dump($reservations);

   // Maintenant vous pouvez envoyer ces réservations à votre vue pour les afficher
   return $this->render('reservation/list_reservations.html.twig', [
       'reservations' => $reservations,
   ]);
}

}
