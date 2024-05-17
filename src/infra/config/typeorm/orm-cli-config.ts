import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['database/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
