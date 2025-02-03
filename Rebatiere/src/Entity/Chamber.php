<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ChamberRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: ChamberRepository::class)]
class Chamber
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $chambername = null;

    #[ORM\Column(nullable: true)]
    private ?int $maxcapacity = null;

    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'chambers')]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChambername(): ?string
    {
        return $this->chambername;
    }

    public function setChambername(string $chambername): static
    {
        $this->chambername = $chambername;

        return $this;
    }

    public function getMaxCapacity(): ?int
    {
        return $this->maxcapacity;
    }

    public function setMaxCapacity(?int $maxcapacity): static
    {
        $this->maxcapacity = $maxcapacity;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setChambers($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getChambers() === $this) {
                $reservation->setChambers(null);
            }
        }

        return $this;
    }

    public function isChamberFull(\DateTimeInterface $start, \DateTimeInterface $end, EntityManagerInterface $em): bool
    {
        // Appel de la méthode qui va compter le nombre de réservations sur une période donnée
        $reservationsCount = $em->getRepository(Reservation::class)->countReservationsForChamberAndDates($this, $start, $end);

        // Comparaison avec la capacité maximale de la chambre
        return $reservationsCount >= $this->getMaxCapacity();
    }
}
