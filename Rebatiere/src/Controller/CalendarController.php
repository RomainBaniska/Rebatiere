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
        $events = $em->getRepository(Reservation::class)->findAll();
    
        // Initialisez le tableau pour stocker tous les événements
        $calendarEvents = [];

        // Boucle sur tous les événements pour récupérer les données et les afficher
        foreach ($events as $event) {
            
            $calendarEvent = [
                'title' => $event->getUsers()->getUsername(),
                'start' => $event->getStart()->format('Y-m-d\TH:i:s'),
                'end' => $event->getEnd()->format('Y-m-d\TH:i:s'),
                'color' => '#AB351C',
                'extendedProps' => [
                    'icon' => '/uploads/images/' . $event->getUsers()->getImageFileName()
                    // Rajouter une condition si null
                ],
            ];
            $calendarEvents[] = $calendarEvent;
        }

        $datas = json_encode($calendarEvents);

        // dump($datas);

        return $this->render('calendar/eventslist.html.twig', [
            'controller_name' => 'CalendarController',
            'datas' => $datas,
        ]);
    }
}
