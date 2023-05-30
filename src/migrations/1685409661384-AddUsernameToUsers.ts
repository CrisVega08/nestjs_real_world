import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameToUsers1685409661384 implements MigrationInterface {
    name = 'AddUsernameToUsers1685409661384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
