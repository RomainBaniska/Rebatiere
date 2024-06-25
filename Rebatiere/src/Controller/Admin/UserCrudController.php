<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureCrud(Crud $crud): Crud 
    {
        return $crud
            ->setEntityLabelInPlural('Utilisateurs')
            ->setEntityLabelInSingular('Utilisateur')
            ->setPageTitle("index", 'Rebatière - Administration des utilisateurs')
            ->setPaginatorPageSize(15);

    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')
                ->hideOnForm(),
            TextField::new('username'),
            TextField::new('firstname'),
            TextField::new('lastname'),
            ImageField::new('imageFileName')
            ->setUploadDir('public\uploads\images/'),
                //->setFormTypeOptions(['disabled' => 'disabled']),
            // TextField::new('password'),
            Field::new('plainPassword')
            ->setColumns(2)
            ->onlyOnForms()
            ->setFormType(PasswordType::class),
            ArrayField::new('roles'),
            // TextEditorField::new('description'),
            // DateTimeField::new('createdAt')
            //      ->hideOnForm(),
        ];
    }
    
}
