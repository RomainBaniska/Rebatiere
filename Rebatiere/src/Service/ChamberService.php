<?php
namespace App\Service;

class ChamberService
{
    private array $chamberIds = [
        'ChambreDehors1' => 3,
        'ChambreDehors2' => 4,
        'ChambreBleue' => 5,
        'ChambreJean-Claude' => 6,
        'ChambredAlex' => 7,
        'ChambreFenêtre' => 8,
        'ChambreduFond' => 9,
        'Dortoirdespetits' => 10,
        'Dortoirdesgrands' => 11,
        'ChambreNicole' => 12,
        'Garage' => 13,
        'ChambreBureau' => 14,
        'Chambredegauche' => 15,
    ];

    public function getChamberId(string $chamberName): ?int
    {
        return $this->chamberIds[$chamberName] ?? null;
    }
}
