import { Injectable } from '@nestjs/common';
import { MoviesRepositoryMVC } from './repositories/movies.repository';
import {
  CreateMovieDto,
  MovieListDto,
  UpdateMovieDto,
} from '../infra/http/dto';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MoviesRepositoryMVC) {}

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
