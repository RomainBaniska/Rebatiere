<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/enregistrement', name: 'app_enregistrement')]
    public function register(EntityManagerInterface $entityManager, UsersRepository $user): Response
    {
        $entityManager->getConnection()->connect();
    }

    #[Route('/enregistrement/{id}/edit', name: 'app_enregistrement_edit')]
    public function editUser(EntityManagerInterface $entityManager, Users $user): Response
    {
        dd($user);
        $entityManager->getConnection()->connect();
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
