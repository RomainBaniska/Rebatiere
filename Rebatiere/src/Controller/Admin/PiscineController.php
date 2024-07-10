<?php

namespace App\Controller\Admin;

use App\Entity\Piscine;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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

            $reservation = new Piscine();
            $reservation->setStart($from);
            $reservation->setEnd($to);
            $reservation->setStatut("OPEN");

            $em->persist($reservation);
            $em->flush();

            return $this->redirectToRoute('app_piscine'); // Redirection vers une autre route
        } catch (\Exception $e) {
            return new Response('Erreur : ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/piscinelist', name: 'app_persistpiscine')]
    public function piscinelist(EntityManagerInterface $em): Response
    {
        $piscineList = $em->getRepository(Piscine::class)->findAll();

        dump($piscineList);
    }
}

