import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMoviesTable1715901651316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'synopsis',
            type: 'text',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'director',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'int',
            default: 0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
