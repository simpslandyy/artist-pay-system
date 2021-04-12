import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRosterTable1618190292706 implements MigrationInterface {
    name = 'CreateRosterTable1618190292706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roster` (`id` int NOT NULL AUTO_INCREMENT, `artist` varchar(255) NOT NULL, `rate` decimal(8,5) NOT NULL, `streams` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `roster`");
    }

}
