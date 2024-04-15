<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends AbstractController
{

    #[Route('/monprofil/edit', name: 'monprofil_edit')]
    public function editUser(EntityManagerInterface $em, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Récupérer l'utilisateur connecté
        $currentUser = $this->getUser();

        // Rediriger vers l'édition de son propre profil
        return $this->redirectToRoute('monprofil', ['id' => $currentUser->getId()]);
    }

    #[Route('/monprofil/{id}', name: 'monprofil')] // on peut remplacer id par n'importe quel autre champs
    public function editUser2(EntityManagerInterface $em, User $user, Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            // Hashage du mot de passe. Premier paramètre "$user" et on va chercher la valeur du password de $user
            $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());
            $user->setPassword($hashedPassword);

            $em->flush(); // on app elle l'entityManager pour "flush" (save/valider) en BDD
            $this->addFlash('success', 'L\'utilisateur a bien été modifié');
            // return $this->redirectToRoute('');
        }
        // dd($user); 
        return $this->render('user/edit2.html.twig', [
            'user' => $user,
            'form' => $form
        ]);
    }

    #[Route('/user/edit/{id}', name: 'user.edit', methods: ['GET', 'POST'])]
    public function edit(User $user, Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $userPasswordHasher): Response
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
        ]);
    }
}
