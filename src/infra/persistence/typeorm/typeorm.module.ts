import { MovieRepository } from '@/application/mskmovies/ports/movie.repositoy';
import { MovieEntity } from '@/infra/persistence/typeorm/entities/movie.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TyperOrmMoviesRepository } from './repositories/typeorm-movies.repository';
import { UserEntity } from '@/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configSerice: ConfigService) => {
        return {
          type: 'postgres',
          host: configSerice.get('DB_HOST'),
          port: Number(configSerice.get('DB_PORT')),
          username: configSerice.get('DB_USER'),
          password: configSerice.get('DB_PASS'),
          database: configSerice.get('DB_NAME'),
          entities: [MovieEntity, UserEntity],
          synchronize: true,
        };
      },

      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([MovieEntity]), // Adicione este trecho para disponibilizar os repositórios
  ],

  providers: [
    {
      provide: MovieRepository,
      useClass: TyperOrmMoviesRepository,
    },
  ],
  exports: [MovieRepository],
})
export class DatabaseModule {}
