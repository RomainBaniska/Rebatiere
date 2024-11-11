<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager, #[Autowire('%photo_dir%')] string $photoDir): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {

            $username = $form->get('username')->getData();
            $firstname = $form->get('firstname')->getData();
            $lastname = $form->get('lastname')->getData();
            $password = $form->get('plainPassword')->getData();

            // Récupérer le fichier envoyé (image de profil)
            $croppedImage = $request->files->get('registrationForm')['croppedImageJPGFile'];

            // $randomText = $request->get('randomText')->getData();

                    // Afficher les informations pour déboguer
            dump($username, $firstname, $lastname, $password);
            dump($croppedImage);  // Cela vous montre le fichier téléchargé
            exit();

            // $user->setPassword(
            //     $userPasswordHasher->hashPassword($user, $password)
            // );


            // // Ajout de l'avatar en BDD avec la condition de null
            // $croppedImage = $request->files->get('croppedImage');  
            // if ($croppedImage) {
            //        $filename = uniqid() . '.' . $croppedImage->getClientOriginalExtension();
            //        $croppedImage->move($photoDir, $filename);
            //        $user->setImageFileName($filename);
            // }

            // Persist & Flush en BDD
            $entityManager->persist($user);
            $entityManager->flush();

            return $security->login($user, 'form_login', 'main');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    #[Route('/register2', name: 'app_register2')]
    public function register2(): Response
    {
        return $this->render('registration/register2.html.twig');
    }


    #[Route('/persistregistration', name: 'app_persistregistration')]
    public function persistRegistration(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $userPasswordHasher, #[Autowire('%photo_dir%')] string $photoDir): Response
    {
            $username = $request->request->get('username');
            $firstname = $request->request->get('firstname');
            $lastname = $request->request->get('lastname');
            $plainPassword = $request->request->get('plainPassword');
            $croppedImage = $request->files->get('croppedImageJPGFile');

            // Je crée une nouvelle instance d'User
            $user = new User();

            // Hachage de password
            // $hashedPassword = $user->setPassword (
            //         $userPasswordHasher->hashPassword($user, $plainPassword)
            // );
            $hashedPassword = $userPasswordHasher->hashPassword($user, $plainPassword);
            $user->setPassword($hashedPassword);

            // Ajout de l'avatar en BDD avec la condition de null
            $fileName = null;
            // $croppedImage = $request->files->get('croppedImageJPGFile'); 
            if(isset($croppedImage)) {
                $fileName = uniqid().'.'.$croppedImage->guessExtension();
                $croppedImage->move($photoDir, $fileName);
            }

            // Assignation des informations traitées
            $user->setUsername($username);
            $user->setFirstname($firstname);
            $user->setLastname($lastname);
            $user->setPassword($hashedPassword);
            $user->setImageFileName($fileName);

            // Persist & Flush en BDD
            $em->persist($user);
            $em->flush();

            return new Response('<h1>Formulaire soumis avec succès.</h1>');
    }
}


