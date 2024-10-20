import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1729383006593 implements MigrationInterface {
    name = 'Db1729383006593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`photoUrl\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`photoUrl\``);
    }

}
