<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240413131157 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD users_id INT DEFAULT NULL, ADD chambers_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495567B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495547FF4606 FOREIGN KEY (chambers_id) REFERENCES chamber (id)');
        $this->addSql('CREATE INDEX IDX_42C8495567B3B43D ON reservation (users_id)');
        $this->addSql('CREATE INDEX IDX_42C8495547FF4606 ON reservation (chambers_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C8495567B3B43D');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C8495547FF4606');
        $this->addSql('DROP INDEX IDX_42C8495567B3B43D ON reservation');
        $this->addSql('DROP INDEX IDX_42C8495547FF4606 ON reservation');
        $this->addSql('ALTER TABLE reservation DROP users_id, DROP chambers_id');
    }
}
