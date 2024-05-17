import { CreateMoviesTable1715901651316 } from 'database/migrations/1715901651316-CreateMoviesTable';
import { CreateUsersTable1715901992571 } from 'database/migrations/1715901992571-CreateUsersTable';
import { MovieEntity } from '@/infra/entities/movie.entity';
import { UserEntity } from '@/infra/entities/user.entity';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  entities: [UserEntity, MovieEntity],
  migrations: [CreateMoviesTable1715901651316, CreateUsersTable1715901992571],
  synchronize: false,
});
