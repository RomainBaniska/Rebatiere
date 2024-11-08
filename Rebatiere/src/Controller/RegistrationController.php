<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager, #[Autowire('%photo_dir%')] string $photoDir): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $password = $form->get('plainPassword')->getData();
            $user->setPassword(
                $userPasswordHasher->hashPassword($user, $password)
            );

            // Ajout de l'avatar en BDD avec la condition de null
            // $photo = $form['photo']->getData();  
            // if($photo) {
            //     $fileName = uniqid().'.'.$photo->guessExtension();
            //     $photo->move($photoDir, $fileName);
            // }
            // $user->setImageFileName($fileName);

            // Gestion du fichier image (croppedImage)
            $croppedImage = $request->files->get('croppedImage');  // Récupère le fichier "croppedImage"
        
            if ($croppedImage) {
            // Génère un nom unique pour l'image
            $filename = uniqid() . '.' . $croppedImage->getClientOriginalExtension();

            // Déplace le fichier dans le répertoire spécifié
            $croppedImage->move($photoDir, $filename);

            // Tu peux ensuite enregistrer ce nom de fichier dans l'entité User
            $user->setImageFileName($filename);
        }


 

            // Persist & Flush en BDD
            $entityManager->persist($user);
            $entityManager->flush();

            // return $security->login($user, 'form_login', 'main');

                    // Répondre avec un JSON pour indiquer le succès
        return $this->json([
            'success' => true,
            'message' => 'Utilisateur créé avec succès',
            'data' => $user,
        ]);
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }
}
