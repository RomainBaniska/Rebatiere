<?php

namespace App\Repository;

use App\Entity\Chamber;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Chamber>
 *
 * @method Chamber|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chamber|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chamber[]    findAll()
 * @method Chamber[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChamberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chamber::class);
    }

    //    /**
    //     * @return Chamber[] Returns an array of Chamber objects
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

    //    public function findOneBySomeField($value): ?Chamber
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
