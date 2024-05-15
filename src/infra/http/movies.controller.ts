import { Controller, Get, Body, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { CreateMovieUseCase } from '@/application/mskmovies/use-case/create-movie';
import { CreateMovieDto } from './dto';
import { GetMoviesUseCase } from '@/application/mskmovies/use-case/get-movies';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('movies  ')
export class MoviesController {
  constructor(
    private createMovieUseCase: CreateMovieUseCase,
    private getMoviesUseCase: GetMoviesUseCase,
  ) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    const response = this.createMovieUseCase.execute(createMovieDto);
    return response;
  }

  @Get()
  @CacheKey('movies')
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @UseInterceptors(CacheInterceptor)
  findAll() {
    return this.getMoviesUseCase.execute({});
  }
}
