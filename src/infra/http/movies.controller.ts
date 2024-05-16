import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { CreateMovieUseCase } from '@/domain/use-case/create-movie';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { GetMoviesUseCase } from '@/domain/use-case/get-movies';
import { DeleteMovieUseCase } from '@/domain/use-case/delete-movie';
import { GetMovieUseCase } from '@/domain/use-case/get-movie';
import { UpdateMovieUseCase } from '@/domain/use-case/update-movie';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('/movies')
export class MoviesController {
  constructor(
    private getMoviesUseCase: GetMoviesUseCase,
    private createMovieUseCase: CreateMovieUseCase,
    private getMovieUseCase: GetMovieUseCase,
    private deleteMoviesUseCase: DeleteMovieUseCase,
    private updateMoviesUseCase: UpdateMovieUseCase,
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

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getMovieUseCase.execute(id);
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteMoviesUseCase.execute(id);
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.updateMoviesUseCase.execute(id, updateMovieDto);
  }
}
