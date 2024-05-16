import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { GetMoviesUseCase } from '@/application/mskmovies/use-case/get-movies';
import { CreateMovieUseCase } from '@/application/mskmovies/use-case/create-movie';
import { AppController } from './app.controller';
import { DatabaseModule } from '../persistence/typeorm/typeorm.module';
import { AuthModule } from '@/auth/auth.module';
import { DeleteMovieUseCase } from '@/application/mskmovies/use-case/delete-movie';
import { GetMovieUseCase } from '@/application/mskmovies/use-case/get-movie';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController, MoviesController],
  providers: [
    CreateMovieUseCase,
    GetMovieUseCase,
    GetMoviesUseCase,
    DeleteMovieUseCase,
  ],
  exports: [],
})
export class HttpModule {}
