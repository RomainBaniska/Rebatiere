<?php

namespace App\Controller\Admin;

use App\Entity\Piscine;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PiscineCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Piscine::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            DateField::new('start'),
            DateField::new('end'),
            TextField::new('statut'),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Piscine')
            ->setEntityLabelInPlural('Piscines')
            ->setSearchFields(['statut']);
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('start')
            ->add('end')
            ->add('statut');
    }
}
