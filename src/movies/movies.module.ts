import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../infra/persistence/typeorm/entities/movie.entity';
import { MoviesRepositoryMVC } from './repositories/movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepositoryMVC],
})
export class MoviesModule {}
