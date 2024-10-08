<?php

namespace App\Form;

use App\Entity\Reservation;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


// Inutilisé en l'état

class ReservationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('start', null, [
                'widget' => 'single_text',
                'input_format' => 'dd/MM/yyyy',
            ])
            ->add('end', null, [
                'widget' => 'single_text',
                'input_format' => 'dd/MM/yyyy',
            ])
            ->add('username')
            ->add('chambername')
            ->add('privatisation')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
        ]);
    }
}
