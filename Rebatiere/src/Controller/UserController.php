<?php

namespace App\Controller;

use App\Entity\Users;
use App\Form\UserType;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

class UserController extends AbstractController
{

    #[Route('/enregistrement/{id}/edit', name: 'app_enregistrement_edit')] // on peut remplacer id par n'importe quel autre champs
    public function editUser(EntityManagerInterface $em, Users $user, Request $request): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $em->flush(); // on appelle l'entityManager pour "flush" (save/valider) en BDD
            $this->addFlash('success', 'L\'utilisateur a bien été modifié');
            // return $this->redirectToRoute('');
        }
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
