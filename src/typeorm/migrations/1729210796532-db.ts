import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1729210796532 implements MigrationInterface {
    name = 'Db1729210796532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`department_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`changedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`employeeId\` int NULL, \`departmentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`department_history\` ADD CONSTRAINT \`FK_64fd3870b4987f72ca7d9406c94\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`department_history\` ADD CONSTRAINT \`FK_f7287e155bd5a4174386240a64a\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`department_history\` DROP FOREIGN KEY \`FK_f7287e155bd5a4174386240a64a\``);
        await queryRunner.query(`ALTER TABLE \`department_history\` DROP FOREIGN KEY \`FK_64fd3870b4987f72ca7d9406c94\``);
        await queryRunner.query(`DROP TABLE \`department_history\``);
    }

}
