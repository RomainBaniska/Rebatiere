<?php

namespace App\Controller;

use PhpParser\Node\Stmt\Return_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CalendarController extends AbstractController
{
    private int $currentYear = 0;
    public int $monthNumber = 0;
    public int $year = 0;
    public int $month = 0;
    private array $months = [];
    public array $datas = [];
    private const DAYS_OFF = ["01-01", "01-05", "08-05", "14-07", "15-08", "01-11", "11-11", "25-12"];
   
    
    #[Route('/calendar', name: 'app_calendar')]
    

    public function index(): Response
    {
        $this->monthNumber  = $this->monthNumber > 12 || $this->monthNumber < 1 ? date("m") : $this->monthNumber;
        $this->year         = $this->year < 2023 ? date("Y") : $this->year;

        $datas = $this->getFullYear($this->year);
        $month = $this->getMonth($this->monthNumber, $this->year);
        

        return $this->render('calendar/index.html.twig', [
            'controller_name' => 'CalendarController',
            
            
        ]);
   }
    
    /**
     * Construction du calendrier
     */
    public function __construct()
    {
        $this->currentYear = date("Y");
       $this->builMonthsList();

  
    }

    /**
     * construction de la liste des mois
     *
     * @return void
     */
    public function builMonthsList() 
    {
        // boucle sur les mois de l'année
        for ($m = 1; $m <=12; $m++) {
            // affiche le nom du mois en anglais
            $monthName  = date('F', strtotime(strval($this->currentYear). '-' .strval($m). '-01'));
            // affiche le nombre de jours dans le mois
            $nbDays     = $this->getDaysOfMonth(strval($this->currentYear), strval($m)); 
            $days = [];
            // boucle sur le jour du mois
            for ($d=1; $d <= $nbDays; $d++) {
                // affiche la date et le nom du jour
                $days[$d] = [
                    'number'    => $d,
                    'name'      => date('l', strtotime(strval($this->currentYear).'-' .strval($m). '-' . strval($d))),
                    'worked'    => $this->isDayWorked($d, $m, $this->currentYear)
                ];
            }

            $this->months[$m] = [
                'nbDays'    => $nbDays,
                'name'      => $monthName,
                'days'      => $days
            ];      
        }
    }

    /**
     * retourne les données de l'année complète
     *
     * @param integer $year année à récupérer
     * @return array tous les mois de l'année
     */
    public function getFullYear(int $year): array 
    {
        $this->setCurrentYear($year);
        return $this->months;
    }

    /**
     * Retourne les données d'un mois
     *
     * @param integer $month numéro du mois à récupérer
     * @param integer $year année à récupérer
     * @return array structure du mois demandé
     */
    public function getMonth(int $month, int $year): array 
    {
        $this->setCurrentYear($year);

        if ($month < 1 || $month > 12) return [];

        return $this->months[$month];
    }

    /**
     * récupère et construit les données sur une année
     *
     * @param integer $year année à récupérer
     * @return void
     */
    public function setCurrentYear(int $year): void
    {
        $this->currentYear = $year;
        $this->builMonthsList();
    }

    /**
     * retourne les jours du mois
     *
     * @param string $year année à récupérer
     * @param string $month mois à récupérer
     * @return integer le nombre de jours dans le mois
     */
    public function getDaysOfMonth(string $year, string $month): int 
    {
        return intval(date('t', strtotime($year.'-' .$month.'-01')));
    }

    /**
     * récupère les jours fériés "fixes" pour une année donnée
     *
     * @param integer $year année à récupérer
     * @return array structure représentant les jours fériés
     */
    public function getBankHoliday(int $year): array 
    {
        $daysOff = [];

        // parcourt la liste des jours fériés fixes et ajoute l'année actuelle
        foreach (self::DAYS_OFF as $dayOff)
            $daysOff[] = $dayOff . "-$year";

            // retourne la liste des jours fériés modifiée
            return $daysOff;
    }

    /**
     * Identifie les samedis, dimanche et jours fériés fixes
     *
     * @param integer $day  jour à récupérer
     * @param integer $month mois à récupérer
     * @param integer $year année à récupérer
     * @return boolean
     */
    public function isDayWorked(int $day, int $month, int $year): bool 
    {
        $dayOfWeek = date('l', strtotime("$day-$month-$year"));
        if ($dayOfWeek === 'Saturday' || $dayOfWeek === 'Sunday') {
            return false;
        }

            if (in_array(sprintf("%02d-%02d-%04d", $day, $month, $year), $this->getBankHoliday($year))) {
                return false;
            }

        return true;
    }
    
}
