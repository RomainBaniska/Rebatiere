<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UsersRepository;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users implements UserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    // Implémentation des méthodes de UserInterface

    public function getRoles(): array
    {
        // Vous pouvez définir les rôles de l'utilisateur ici
        // Par exemple, retournez un tableau avec un rôle par défaut
        return ['ROLE_USER'];
    }

    public function getSalt()
    {
        // Si vous utilisez un cryptage de mot de passe qui nécessite un sel, vous pouvez le renvoyer ici.
        // Pour une utilisation simple, vous pouvez laisser cette méthode vide.
        return null;
    }

    public function eraseCredentials()
    {
        // Si vous stockez des données sensibles dans l'entité qui doit être effacée lorsque l'objet est utilisé comme un objet de sécurité, nettoyez-les ici.
        // Par exemple, réinitialisez le mot de passe en texte brut.
        // Pour une utilisation simple, vous pouvez laisser cette méthode vide.
    }

    public function getUserIdentifier(): string
    {
        // Cette méthode doit renvoyer un identifiant unique pour l'utilisateur.
        // Par exemple, dans la plupart des cas, l'identifiant peut être l'adresse e-mail ou le nom d'utilisateur.
        return $this->username;
    }
}
