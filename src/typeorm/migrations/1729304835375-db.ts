import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1729304835375 implements MigrationInterface {
    name = 'Db1729304835375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`status\``);
    }

}
