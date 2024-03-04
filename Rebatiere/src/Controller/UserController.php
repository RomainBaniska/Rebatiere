<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/enregistrement', name: 'app_enregistrement')]

    

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
