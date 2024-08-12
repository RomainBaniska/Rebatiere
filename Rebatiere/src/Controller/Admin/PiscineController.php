<?php

namespace App\Controller\Admin;

use App\Entity\Piscine;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Exception;

class PiscineController extends AbstractController
{
    #[Route('/piscine', name: 'app_piscine')]
    public function watchPiscine(): Response
    {

        return $this->render('piscine/index.html.twig', [
            'controller_name' => 'PiscineController',
        ]);
    }

    #[Route('/persistpiscine', name: 'app_persistpiscine')]
    public function persistPiscine(Request $request, EntityManagerInterface $em): Response
    {
        try {
            $from = new \DateTime($request->request->get('from'));
            $to = new \DateTime($request->request->get('to'));
            $dates = [];
            $currentDate = clone $from;
            while ($currentDate <= $to) {
                $dates[] = $currentDate->format('Y-m-d');
                $currentDate->modify('+1 day');
                }

            $reservation = new Piscine();
            $reservation->setStart($from);
            $reservation->setEnd($to);
            $reservation->setDates($dates);
            $reservation->setStatut("OPEN");

            $em->persist($reservation);
            $em->flush();

            return $this->redirectToRoute('app_piscine'); // Redirection vers une autre route
        } catch (\Exception $e) {
            return new Response('Erreur : ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/piscineDelete/{id}', name: 'app_deletepiscine', methods: ['POST'])]
    public function deletePiscine(EntityManagerInterface $em, Request $request, Piscine $piscine): Response
    {
           // Protection contre les CSRF
           if ($this->isCsrfTokenValid('delete'.$piscine->getId(), $request->request->get('_token'))) {
            $em->remove($piscine);
            $em->flush();
        }

    // Rediriger vers la page actuelle
    $referer = $request->headers->get('referer');
    return new RedirectResponse($referer);
    }

    #[Route('/piscinelist', name: 'app_piscinelist')]
    public function piscinelist(EntityManagerInterface $em): Response
    {
        $piscineList = $em->getRepository(Piscine::class)->findAll();

        // dump($piscineList);

        return $this->render('piscine/list.html.twig', [
            'piscines' => $piscineList,
        ]);
    }

    #[Route('/api/check-date/{date}', name: 'check_date')]
    public function checkDate($date, EntityManagerInterface $em): JsonResponse
    {
        $piscineRepository = $em->getRepository(Piscine::class);
        $piscines = $piscineRepository->findAll();

        foreach ($piscines as $piscine) {
            if (in_array($date, $piscine->getDates())) {
                return new JsonResponse(['exists' => true]);
            }
        }

        return new JsonResponse(['exists' => false]);
    }
    
    // Nécessaire à l'envoi la gestion de la pastille verte/rouge du calendar

    #[Route('/api/piscine-dates', name: 'api_piscine_dates')]
    public function getPiscineDates(EntityManagerInterface $em): JsonResponse
    {
        $piscineRepository = $em->getRepository(Piscine::class);
        $piscines = $piscineRepository->findAll();
    
        $dates = [];
        foreach ($piscines as $piscine) {
            $dates = array_merge($dates, $piscine->getDates());
        }
        $dates = array_unique($dates); // Retirer les doublons
    
        return new JsonResponse($dates);
    }

}

