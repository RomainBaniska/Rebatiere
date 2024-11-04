<?php

namespace App\EventListener;

use Twig\Environment;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Bundle\SecurityBundle\Security;

class TwigEventListener implements EventSubscriberInterface
{
    private $twig;
    private $security;

    public function __construct(Environment $twig, Security $security)
    {
        $this->twig = $twig;
        $this->security = $security;
    }

    public function onKernelController(ControllerEvent $event)
    {
        // On doit passer par la classe security pour choper l'user, car pas d'abstractController hérité
        $user = $this->security->getUser();

        if ($user) {
            $currentUserId = $user->getId();
            $currentUser = $user->getUsername();
            $currentUserFirstName = $user->getFirstname();
            $currentUserLastName = $user->getLastname();

            // Gestion de la photo de profil
            $photo = $user->getImageFileName();
            if (!$photo) {
                $photo = 'assets/images/defaultavatar.png';
            } else {
                $photo = 'uploads/images/' . $photo;
            }

            // Ajoute les variables globales pour Twig
            $this->twig->addGlobal('currentUserId', $currentUserId);
            $this->twig->addGlobal('currentUser', $currentUser);
            $this->twig->addGlobal('currentUserFirstName', $currentUserFirstName);
            $this->twig->addGlobal('currentUserLastName', $currentUserLastName);
            $this->twig->addGlobal('photo', $photo);
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
