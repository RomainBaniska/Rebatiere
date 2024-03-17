<?php

namespace App\Controller;

use App\Entity\Users;
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
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends AbstractController
{

    #[Route('/login2', name: 'app_login2')]
    public function getProfile(ManagerRegistry $managerRegistry, Request $request, AuthenticationUtils $authenticationUtils, SessionInterface $sessionInterface, UserPasswordEncoderInterface $passwordEncoder): Response
    {

        // Récupère le dernier nom d'utilisateur utilisé
        $lastUsername = $authenticationUtils->getLastUsername();

        // Crée une nouvelle instance de l'entité Users
        $user = new Users();

        // Pré-remplit le champ "utilisateur"
        $user->setUsername($lastUsername);

        // Formulaire
        $form = $this->createForm(UserType::class, $user);

        // Soumission du formulaire
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Récupère l'utilisateur correspondant à l'adresse e-mail fournie depuis la base de données
            $userRepository = $managerRegistry->getRepository(Users::class);
            $authenticatedUser = $userRepository->findOneBy(['username' => $user->getUsername()]);

        if (!$authenticatedUser) {
            // Si aucun utilisateur n'est trouvé on affiche un message d'erreur
            $this->addFlash('error', 'Nom d\'utilisateur incorrect.');
            return $this->redirectToRoute('app_login');
        }

        // Compare si le mot de passe fourni correspond au mot de passe de l'utilisateur en utilisant le service PasswordEncoder
        if (!$passwordEncoder->isPasswordValid($authenticatedUser, $user->getPassword())) {
        // Si le mot de passe est incorrect, affiche un message d'erreur et redirige vers la page de connexion
        $this->addFlash('error', 'Mot de passe incorrect.');
        return $this->redirectToRoute('app_login');
        }   

        // Stocke l'ID de l'utilisateur connecté dans la session
        $sessionInterface->set('user_id', $authenticatedUser->getId());

        //  // Compare si le mot de passe fourni correspond au mot de passe de l'utilisateur
        //  if (password_verify($user->getPassword(), $authenticatedUser->getPassword())) {

        //     // Stocke le nom de l'utilisateur connecté dans la session
        //     $sessionInterface-> set('username', $user->getUsername());
        // }

    //     // Redirige vers la page profil
    //     return $this->redirectToRoute('app_home');
    // }

    //     return $this->render('user/login.html.twig', [
    //         'userForm' => $form->createView(),
    //         'user' => $user
    //     ]);
 
            // Redirige vers la page d'accueil
            return $this->redirectToRoute('app_home');
        }
    
        // Affiche la page de connexion avec le formulaire
        return $this->render('user/login.html.twig', [
            'userForm' => $form->createView(),
            'user' => $user
        ]);
    }

    #[Route('/enregistrement', name: 'app_enregistrement')]
    public function register(EntityManagerInterface $entityManager, UsersRepository $user): Response
    {
        $entityManager->getConnection()->close();
        // $entityManager->getConnection()->connect();
        dd($user);
    }

    #[Route('/enregistrement/{id}/edit', name: 'app_enregistrement_edit')] // on peut remplacer id par n'importe quel autre champs
    public function editUser(EntityManagerInterface $em, Users $user, Request $request): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $em->flush(); // on appelle l'entityManager pour "flush" (save/valider) en BDD
            $this->addFlash('success', 'L\'utilisateur a bien été modifié');
            // return $this->redirectToRoute('');
        }
        // dd($user); 
        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form
        ]);
    }

    #[Route('/dbTestConnection', name: 'app_dbTestConnection')]
    public function testDatabaseConnection(EntityManagerInterface $entityManager): Response
    {
        try {
            $entityManager->getConnection()->connect();
            
            return new Response('Connexion à la base de données établie avec succès !');
        } catch (\Exception $e) {
            return new Response('Impossible de se connecter à la base de données : ' . $e->getMessage());
        }
    }
}
