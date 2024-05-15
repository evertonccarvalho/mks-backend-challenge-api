import { Injectable } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './repositories/movies.repository';
import { MovieListDto } from './dto/movies-list.dto.ts';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MoviesRepository) {}

  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto);
  }

  async findAll(): Promise<MovieListDto[]> {
    return this.movieRepository.findAll();
  }

  async findOne(id: string): Promise<MovieListDto> {
    return this.movieRepository.findOne(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: string): Promise<void> {
    return this.movieRepository.remove(id);
  }
}
