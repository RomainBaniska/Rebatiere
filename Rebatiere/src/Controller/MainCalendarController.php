<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MainCalendarController extends AbstractController
{
    #[Route('/mainCalendar', name: 'app_calendar')]
    public function index(): Response
    {
        return $this->render('mainCalendar/index.html.twig', [
            'controller_name' => 'MainCalendarController',
        ]);
    }
}
