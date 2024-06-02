<?php

namespace App\Entity;

use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    // #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[ORM\Column(type: 'date')]
    private ?\DateTimeInterface $start = null;

    // #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[ORM\Column(type: 'date')]
    private ?\DateTimeInterface $end = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $dates = [];

    #[ORM\Column]
    private ?bool $privatisation = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?User $users = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    private ?Chamber $chambers = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): static
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(\DateTimeInterface $end): static
    {
        $this->end = $end;

        return $this;
    }

    // Array de dates
    public function getDates(): ?array
    {
        return $this->dates;
    }

    public function setDates(array $dates): static
    {
        $this->dates = $dates;
        return $this;
    }

    public function isPrivatisation(): ?bool
    {
        return $this->privatisation;
    }

    public function setPrivatisation(bool $privatisation): static
    {
        $this->privatisation = $privatisation;

        return $this;
    }

    public function getUsers(): ?User
    {
        return $this->users;
    }

    public function setUsers(?User $users): static
    {
        $this->users = $users;

        return $this;
    }

    public function getChambers(): ?Chamber
    {
        return $this->chambers;
    }

    public function setChambers(?Chamber $chambers): static
    {
        $this->chambers = $chambers;

        return $this;
    }

    // // Méthode qui va empêcher l'overlapping des événements :
    public function isOverlapping(\DateTimeInterface $start, \DateTimeInterface $end): bool
    {
        return ($this->start < $end && $this->end > $start);
    }
}
