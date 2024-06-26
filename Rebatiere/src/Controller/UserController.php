<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Entity\Reservation;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends AbstractController
{
    #[Route('/checkuser', name: 'user.check')]
    public function checkUser(): Response
    {
        // Récupérer l'utilisateur connecté
        $currentUser = $this->getUser();

        if(!$currentUser) {
            return $this->redirectToRoute('app_login');
        }

        $currentUserId = $currentUser->getId();

        return $this->redirectToRoute('user.edit', ['id' => $currentUserId]);
    }

    #[Route('/checkreservation', name: 'user.checkreservation')]
    public function checkReservation(): Response
    {
        // Récupérer l'utilisateur connecté
        $currentUser = $this->getUser();

        if(!$currentUser) {
            return $this->redirectToRoute('app_login');
        }

        $currentUserId = $currentUser->getId();

        // dump($currentUserId);

        return $this->redirectToRoute('user.reservation.edit', ['id' => $currentUserId]);
    }

    #[Route('/user/edit/{id}', name: 'user.edit', methods: ['GET', 'POST'])]
    public function edit(User $user, Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $userPasswordHasher, #[Autowire('%photo_dir%')] string $photoDir): Response
    {
        // Récupérer l'utilisateur connecté
        $currentUser = $this->getUser();

        if(!$currentUser) {
            return $this->redirectToRoute('app_login');
        }

        if($currentUser !== $user) {
            return $this->redirectToRoute('app_home');
        }

        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();

            //hashage pw
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );

            // Ajout de l'avatar en BDD avec la condition de null
            $photo = $form['photo']->getData();  
            if(isset($photo)) {
                $fileName = uniqid().'.'.$photo->guessExtension();
                $photo->move($photoDir, $fileName);
            }
            $user->setImageFileName($fileName);


            // Persist & Flush en BDD
            $em->persist($user);
            $em->flush();

            // Remplacer plus tard le "addFlash" par une modal javascript
        $this->addFlash(
            'success',
            'les informations de votre compte ont bien été modifiées'
        );
        return $this->redirectToRoute('app_home');
        }

        return $this->render('user/edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
            'currentUser' => $currentUser,
        ]);
    }

    #[Route('/user/reservation/{id}', name: 'user.reservation.edit', methods: ['GET', 'POST'])]
    public function viewReservation(User $user, EntityManagerInterface $em) {
        // Récupérer l'utilisateur connecté
        $currentUser = $this->getUser();

        if(!$currentUser) {
            return $this->redirectToRoute('app_login');
        }

        if($currentUser !== $user) {
            return $this->redirectToRoute('app_home');
        }

        $reservations = $em->getRepository(Reservation::class)->findby(
            ['users' => $currentUser],
        );

        return $this->render('user/reservations.html.twig', [
            'reservations' => $reservations,
            'currentUser' => $currentUser,
        ]);

    }

    #[Route('/user/reservation/{id}/delete', name: 'user.reservation.delete', methods: ['POST'])]
    public function reservationDelete(Reservation $reservation, EntityManagerInterface $em, Request $request): Response {
          
        // Protection contre les CSRF
          if ($this->isCsrfTokenValid('delete'.$reservation->getId(), $request->request->get('_token'))) {
            $em->remove($reservation);
            $em->flush();

            $this->addFlash('success', 'Reservation deleted successfully');
        }

        return $this->redirectToRoute('user.reservation.edit');
    }

}
