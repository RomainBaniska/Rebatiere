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
    // #[Route('/register', name: 'app_register')]
    // public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager, #[Autowire('%photo_dir%')] string $photoDir): Response
    // {
    //     $user = new User();
    //     $form = $this->createForm(RegistrationFormType::class, $user);
    //     $form->handleRequest($request);

    //     if ($form->isSubmitted() && $form->isValid()) {

    //         $username = $form->get('username')->getData();
    //         $firstname = $form->get('firstname')->getData();
    //         $lastname = $form->get('lastname')->getData();
    //         $password = $form->get('plainPassword')->getData();

    //         // Récupérer le fichier envoyé (image de profil)
    //         $croppedImage = $request->files->get('registrationForm')['croppedImageJPGFile'];

    //                 // Afficher les informations pour déboguer
    //         dump($username, $firstname, $lastname, $password);
    //         dump($croppedImage);  // Cela vous montre le fichier téléchargé
    //         exit();

    //         // Persist & Flush en BDD
    //         $entityManager->persist($user);
    //         $entityManager->flush();

    //         return $security->login($user, 'form_login', 'main');
    //     }

    //     return $this->render('registration/register.html.twig', [
    //         'registrationForm' => $form,
    //     ]);
    // }

    #[Route('/register', name: 'app_register')]
    public function register(): Response
    {
        return $this->render('registration/register.html.twig');
    }


    #[Route('/persistregistration', name: 'app_persistregistration')]
    public function persistRegistration(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $userPasswordHasher, #[Autowire('%photo_dir%')] string $photoDir): Response
    {
            $username = $request->request->get('username');
            $firstname = $request->request->get('firstname');
            $lastname = $request->request->get('lastname');
            $plainPassword = $request->request->get('plainPassword');
            $croppedImage = $request->files->get('croppedImageJPGFile');


            // Ajout d'une REGEX excluant tous les caractères spéciaux pour les identifiants
            // (todo) Ajouter aussi un script avant envoi
            $pattern = '/[^a-zA-Z0-9àâäéèêëîïôöùûüÿç]/';
            if (preg_match($pattern, $username) || preg_match($pattern, $firstname) || preg_match($pattern, $lastname)) {
                $this->addFlash('error', 'Les caractères spéciaux sont interdits dans le nom d\'utilisateur, le prénom, et le nom de famille.');
                return $this->redirectToRoute('app_register');
            }

            // Vérifier si le nom d'utilisateur existe déjà avant l'insertion
            $existingUser = $em->getRepository(User::class)->findOneBy(['username' => $username]);
            if ($existingUser) {
                $this->addFlash('error', 'Nom d\'utilisateur déjà pris.');
                return $this->redirectToRoute('app_register');
            }

            // Je crée une nouvelle instance d'User
            $user = new User();

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

            return $this->render('registration/register_success.html.twig');
    }
}


