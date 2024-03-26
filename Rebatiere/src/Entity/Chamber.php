<?php

namespace App\Entity;

use App\Repository\ChamberRepository;
use Doctrine\ORM\Mapping as ORM;

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
    private ?int $capacity = null;

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

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(?int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }
}
