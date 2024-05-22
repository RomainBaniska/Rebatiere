<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {

        if (!$this->getUser()) {
            return $this->render('home/ask.html.twig');
        }

        $currentUser = $this->getUser()->getUsername();
        $currentUserFirstName = $this->getUser()->getFirstname();
        $currentUserLastName = $this->getUser()->getLastname();

        $photo = $this->getUser()->getImageFileName();
        if(!$photo) {
            $photo = 'assets/images/defaultavatar.png';
        } else {
            $photo = 'uploads/images/' . $photo;
        }

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'currentUser' => $currentUser,
            'currentUserFirstName' => $currentUserFirstName,
            'currentUserLastName' => $currentUserLastName,
            'photo' => $photo,
        ]);
    }

    #[Route('/map', name: 'app_map')]
    public function map(): Response
    {

        return $this->render('home/map.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/testprofile', name: 'app_testprofile')]
    public function testprofil(): Response
    {

        return $this->render('home/profiledropdown.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
