import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRosterTable1618282703272 implements MigrationInterface {
    name = 'CreateRosterTable1618282703272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roster` (`id` int NOT NULL AUTO_INCREMENT, `artist` varchar(255) NOT NULL, `rate` decimal(8,5) NOT NULL, `streams` int NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `roster`");
    }

}
