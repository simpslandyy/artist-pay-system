import {MigrationInterface, QueryRunner} from "typeorm";
import MOCK from '../../roster'
const { data } = MOCK

export class AddArtists1673490552040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for(let d of data) {
            await queryRunner.query(`INSERT INTO 'roster' (artist, rate, streams) VALUES (${d.artist}, ${d.rate}, ${d.streams}});`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for(let d of data) {
            await queryRunner.query(`TRUNCATE 'roster;`)
        }
    }

}
