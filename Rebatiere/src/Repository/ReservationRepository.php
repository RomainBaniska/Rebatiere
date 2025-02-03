<?php

namespace App\Repository;

use DateTimeInterface;
use App\Entity\Chamber;
use App\Entity\Reservation;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Reservation>
 *
 * @method Reservation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reservation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reservation[]    findAll()
 * @method Reservation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservation::class);
    }

           public function findOverlappingReservations($userId, \DateTimeInterface $start, \DateTimeInterface $end): array
       {
           return $this->createQueryBuilder('r')
                ->andWhere('r.users = :user')
                ->andWhere('r.start < :end')
                ->andWhere('r.end > :start')
                ->setParameter('user', $userId)
                ->setParameter('start', $start)
                ->setParameter('end', $end)
                ->getQuery()
                ->getResult();
       }

       public function countReservationsForChamberAndDates(Chamber $chamber, \DateTimeInterface $start, \DateTimeInterface $end): int
       {
            return (int) $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->andWhere('r.chambers = :chamber')
            ->andWhere('r.start < :end')
            ->andWhere('r.end > :start')
            ->setParameter('chamber', $chamber)
            ->setParameter('start', $start)
            ->setParameter('end', $end)
            ->getQuery()
            ->getSingleScalarResult();
       }

       public function countReservationsForPeriod(\DateTimeInterface $start, \DateTimeInterface $end): array
        {
            return $this->createQueryBuilder('r')
                ->select('r.id, r.start, r.end, u.id AS user_id, c.id AS chamber_id')
                ->join('r.users', 'u') 
                ->join('r.chambers', 'c') 
                ->where('r.start <= :end')
                ->andWhere('r.end >= :start')
                ->setParameter('start', $start)
                ->setParameter('end', $end)
                ->getQuery()
                ->getResult();
        }
}
