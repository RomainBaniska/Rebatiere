<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Chamber;
use App\Entity\Reservation;
use App\Form\ReservationFormType;
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
        $user = $request->request->getInt('username');
        $chamber = $request->request->getInt('chambername');
        $privatisation = (bool) $request->request->get('privatisation');

        // dump($from, $to, $user, $chamber, $privatisation, $allValues);

        // Nouvelle instance de l'entité Réservation
        $reservation = new Reservation();
        $reservation->setStart($from);
        $reservation->setEnd($to);
        $reservation->setUserId($user);
        $reservation->setChamberId($chamber);
        $reservation->setPrivatisation($privatisation);

        $em->persist($reservation);
        $em->flush();

        return $this->redirectToRoute('app_home');
    }
}
