<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{

    #[Route(path: '/login', name: 'app_login')]
public function login(Request $request, AuthenticationUtils $authenticationUtils): Response
{
    // Récupérer l'erreur d'authentification s'il y en a une
    $error = $authenticationUtils->getLastAuthenticationError();

    // Récupérer le dernier nom d'utilisateur saisi par l'utilisateur
    $lastUsername = $authenticationUtils->getLastUsername();

    // Vérifier si le formulaire a été soumis
    // if ($request->isMethod('POST')) {
    //     // Le formulaire a été soumis, les données doivent être disponibles dans la requête
    //     $username = $request->request->get('username');
    //     $password = $request->request->get('password');

    //     // Vous pouvez maintenant utiliser $username et $password pour effectuer l'authentification
    // }

    return $this->render('security/login.html.twig', [
        'last_username' => $lastUsername,
        'error' => $error
    ]);
}

    // #[Route(path: '/login', name: 'app_login')]
    // public function login(AuthenticationUtils $authenticationUtils): Response
    // {

    //     // get the login error if there is one
    //     $error = $authenticationUtils->getLastAuthenticationError();
    //     // last username entered by the user
    //     $lastUsername = $authenticationUtils->getLastUsername();

    //     return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    // }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
