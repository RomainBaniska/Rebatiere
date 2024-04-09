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
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation')]
    public function reservation(Request $request, EntityManagerInterface $em, AuthenticationUtils $authenticationUtils): Response
    {

        //Récupérer les from/to (start & end) de la page home
        $from = $request->request->get('from');
        $to = $request->request->get('to');

        //Récupérer l'utilisateur connecté
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




        // $reservation = new Reservation();
        // $form = $this->createForm(ReservationFormType::class, $reservation);
        // $form->handleRequest($request);

        // // dump($from, $to, $username, $chambername, $privatisation);

        // if ($form->isSubmitted() && $form->isValid()) {

        //     $from = $form->get('from')->getData();
        //     $to = $form->get('to')->getData();
        //     $username = $form->get('username')->getData();
        //     $chambername = $form->get('chambername')->getData();
        //     $privatisation = $form->get('privatisation')->getData();

        //     $reservation->setStart($from);
        //     $reservation->setEnd($to);
        //     $reservation->setUsername($username);
        //     $reservation->setChambername($chambername);
        //     $reservation->setPrivatisation($privatisation);

        //     $entityManager->persist($reservation);
        //     $entityManager->flush();

        //     return $this->redirectToRoute('app_home');
        // }


        // return $this->render('errors/error403.html.twig', [
        //     'reservationForm' => $form,
        // ]);

 
    }
}
