import { DataSource, DataSourceOptions } from 'typeorm';
import { MovieEntity } from '../../entities/movie.entity';
import { UserEntity } from '@/infra/entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MovieEntity, UserEntity],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [],
});
