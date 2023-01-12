import {MigrationInterface, QueryRunner} from "typeorm";
import MOCK from '../../roster'
const { data } = MOCK

export class AddArtistsToRoster1673493533343 implements MigrationInterface {
    name = 'AddArtistsToRoster1673493533343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        for(let d of data) {
            await queryRunner.query(`INSERT INTO roster (artist, rate, streams) VALUES ('${d.artist}', ${d.rate}, ${d.streams});`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE roster;`)
    }

}