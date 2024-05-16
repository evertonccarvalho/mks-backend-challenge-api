import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { GetMoviesUseCase } from '@/application/mskmovies/use-case/get-movies';
import { CreateMovieUseCase } from '@/application/mskmovies/use-case/create-movie';
import { AppController } from './app.controller';

@Module({
  imports: [], // Adicione o DatabaseModule às importações
  controllers: [AppController, MoviesController],
  providers: [CreateMovieUseCase, GetMoviesUseCase],
  exports: [],
})
export class HttpModule {}
