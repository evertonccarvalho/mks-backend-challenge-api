import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { GetMoviesUseCase } from '@/domain/use-case/get-movies';
import { CreateMovieUseCase } from '@/domain/use-case/create-movie';
import { AppController } from './app.controller';
import { DatabaseModule } from '../persistence/typeorm/typeorm.module';
import { AuthModule } from '@/auth/auth.module';
import { DeleteMovieUseCase } from '@/domain/use-case/delete-movie';
import { GetMovieUseCase } from '@/domain/use-case/get-movie';
import { UpdateMovieUseCase } from '@/domain/use-case/update-movie';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController, MoviesController],
  providers: [
    CreateMovieUseCase,
    GetMovieUseCase,
    GetMoviesUseCase,
    DeleteMovieUseCase,
    UpdateMovieUseCase,
  ],
  exports: [],
})
export class HttpModule {}
