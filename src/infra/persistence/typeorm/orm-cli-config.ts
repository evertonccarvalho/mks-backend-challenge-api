import { DataSource, DataSourceOptions } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [MovieEntity],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [],
});

// import { MovieRepository } from '@/application/mskmovies/ports/movie.repositoy';
// import { Module } from '@nestjs/common';
// import { TyperOrmMoviesRepository } from './repositories/typeorm-movies.repository';
// import { PostgresModule } from './PostGresModule';

// @Module({
//   imports: [PostgresModule],
//   providers: [
//     {
//       provide: MovieRepository,
//       useClass: TyperOrmMoviesRepository,
//     },
//   ],
//   exports: [MovieRepository],
// })
// export class DatabaseModule {}
