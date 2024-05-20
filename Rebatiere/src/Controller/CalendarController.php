<?php

namespace App\Controller;

use App\Entity\Reservation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CalendarController extends AbstractController
{
    #[Route('/calendar', name: 'app_calendar')]
    public function index(EntityManagerInterface $em): Response
    {
        $events = $em->getRepository(Reservation::class)->findall();
    

        return $this->render('calendar/eventslist.html.twig', [
            'controller_name' => 'CalendarController',
            'events' => $events,
        ]);
    }
}
