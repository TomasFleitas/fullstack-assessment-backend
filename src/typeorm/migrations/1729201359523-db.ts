import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1729201359523 implements MigrationInterface {
    name = 'Db1729201359523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`hireDate\` date NOT NULL, \`phone\` varchar(20) NOT NULL, \`address\` varchar(255) NOT NULL, \`department_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_d62835db8c0aec1d18a5a927549\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_d62835db8c0aec1d18a5a927549\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`department\``);
    }

}
