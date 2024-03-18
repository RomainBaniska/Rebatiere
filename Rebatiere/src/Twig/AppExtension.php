<?php

namespace App\Twig;

use App\Entity\Calendar;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{

    public int $year = 0;
    public array $datasYear = [];

   public function getFilters()
   {
            return [
                new TwigFilter('year', [$this, 'filterYear']),
            ];
   }

   public function filterYear()
   {
    $this->year         = isset($_GET['year']) ? intval($_GET['year']) : date("Y");
    $this->year         = $this->year < 2023 ? date("Y") : $this->year;

        return $this->year;
   }


}
