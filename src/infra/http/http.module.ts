import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { GetMoviesUseCase } from '@/application/mskmovies/use-case/get-movies';
import { CreateMovieUseCase } from '@/application/mskmovies/use-case/create-movie';
import { DatabaseModule } from '../persistence/typeorm/database.module';

@Module({
  imports: [DatabaseModule], // Adicione o DatabaseModule às importações
  controllers: [MoviesController],
  providers: [CreateMovieUseCase, GetMoviesUseCase],
  exports: [],
})
export class HttpModule {}
