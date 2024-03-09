<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\UserType;
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
        $entityManager->getConnection()->close();
        // $entityManager->getConnection()->connect();
        dd($user);
    }

    #[Route('/enregistrement/{id}/edit', name: 'app_enregistrement_edit')] // on peut remplacer id par n'importe quel autre champs
    public function editUser(EntityManagerInterface $entityManager, Users $user): Response
    {
        $form = $this->createForm(UserType::class, $user);


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
