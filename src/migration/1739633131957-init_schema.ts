import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1739633131957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public."user"(
            id serial primary key,
            email varchar(60) not null unique,
            created_at timestamp not null default now()
            );

            CREATE INDEX idx_user_email ON public."user"(email);

            CREATE TABLE public."newsletter_read"(
            id serial primary key,
            newsletter_id varchar not null,
            read_at timestamp not null default now(),
            user_id integer not null,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
            );

            CREATE INDEX idx_newsletter_user_id ON public."newsletter_read"(user_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE IF EXISTS public."user";
            DROP TABLE IF EXISTS public."newsletter_read";
        `);
    }

}
