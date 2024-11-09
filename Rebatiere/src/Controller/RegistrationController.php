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


            // // Ajout de l'avatar en BDD avec la condition de null
            // $croppedImage = $request->files->get('croppedImage');  
            // if ($croppedImage) {
            //        $filename = uniqid() . '.' . $croppedImage->getClientOriginalExtension();
            //        $croppedImage->move($photoDir, $filename);
            //        $user->setImageFileName($filename);
            // }

            // Récupérer l'image en base64
            $croppedImageBase64 = $request->get('croppedImage'); // Supposons que l'image soit envoyée via un champ caché

            dump($croppedImageBase64);
            exit();
            
            if ($croppedImageBase64) {
                // Décoder l'image en base64
                $data = base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $croppedImageBase64));

                // Générer un nom unique pour le fichier
                $filename = uniqid() . '.png'; // Ou l'extension correspondant à l'image

                // Enregistrer l'image décodée dans un fichier
                file_put_contents($photoDir . '/' . $filename, $data);

                // Assigner le nom du fichier à l'utilisateur
                $user->setImageFileName($filename);
            }

            // dump($user);
            // dump($croppedImage);
            // exit();

            // Persist & Flush en BDD
            $entityManager->persist($user);
            $entityManager->flush();

            return $security->login($user, 'form_login', 'main');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }
}

//     // Récupération de la photo de profil croppée envoyée par AJAX
//     public function uploadCroppedImage(Request $request)
//     {
//     $croppedImage = $request->files->get('croppedImage');

//     if ($croppedImage) {
//         $originalFilename = pathinfo($croppedImage->getClientOriginalName(), PATHINFO_FILENAME);
//         $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [:Punctuation:]', $originalFilename);
//         $newFilename = $safeFilename.'-'.uniqid().'.'.$croppedImage->guessExtension();

//         // Déplacer le fichier téléchargé
//         $croppedImage->move(
//             $this->getParameter('profile_pictures_directory'),
//             $newFilename
//         );

//         // Retourner une réponse JSON avec l'URL du fichier ou une autre donnée
//         return $this->json(['success' => true, 'filename' => $newFilename]);
//     }

//     return $this->json(['success' => false, 'message' => 'No image received']);
// }

