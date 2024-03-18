<?php

namespace App\Repository;

use App\Entity\Calendar;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Calendar>
 *
 * @method Calendar|null find($id, $lockMode = null, $lockVersion = null)
 * @method Calendar|null findOneBy(array $criteria, array $orderBy = null)
 * @method Calendar[]    findAll()
 * @method Calendar[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CalendarRepository extends ServiceEntityRepository
{
    public int $monthNumber = 0;
    public array $datasMonth = [];

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Calendar::class);
    }

    public function getCalendar()
    {
        $this->monthNumber  = isset($_GET['month']) ? intval($_GET['month']) : date("m"); 
        $this->monthNumber  = $this->monthNumber > 12 || $this->monthNumber < 1 ? date("m") : $this->monthNumber;

        $datasYear = $this->getFullYear($this->year);
        $datasMonth = $this->getMonth($this->monthNumber, $this->year);
        
        return $this->render('calendar/index.html.twig', [
            'year'            => $datasYear,
            'month'           => $datasMonth
        ]);

    }

    //    /**
    //     * @return Calendar[] Returns an array of Calendar objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Calendar
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
