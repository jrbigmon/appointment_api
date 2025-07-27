import { MigrationInterface, QueryRunner } from 'typeorm';

export class EqualizeDatabase1753574784324 implements MigrationInterface {
  name = 'EqualizeDatabase1753574784324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "rg" character varying NOT NULL, "phone" character varying NOT NULL, "active" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "client_id" uuid NOT NULL, "price" numeric NOT NULL, "price_per_hour" numeric NOT NULL, "status" character varying NOT NULL, "billing_type" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_e2b48c798a6f5d7827dd7d714e8" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_e2b48c798a6f5d7827dd7d714e8"`,
    );
    await queryRunner.query(`DROP TABLE "schedules"`);
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
