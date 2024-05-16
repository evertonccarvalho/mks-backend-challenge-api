import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { GetMoviesUseCase } from '@/application/mskmovies/use-case/get-movies';
import { CreateMovieUseCase } from '@/application/mskmovies/use-case/create-movie';
import { AppController } from './app.controller';
import { DatabaseModule } from '../persistence/typeorm/typeorm.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController, MoviesController],
  providers: [CreateMovieUseCase, GetMoviesUseCase],
  exports: [],
})
export class HttpModule {}
