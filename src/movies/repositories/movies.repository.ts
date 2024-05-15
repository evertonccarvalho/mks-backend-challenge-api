import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MovieListDto } from '../dto/list-movies.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { NotFoundError } from '@/application/errors/not-found-error';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieListDto> {
    const newMovie = await this.movieRepository.save(createMovieDto);
    return new MovieListDto(newMovie);
  }

  async findAll(): Promise<MovieListDto[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => new MovieListDto(movie));
  }

  async findOne(id: string): Promise<MovieListDto> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundError('Movie not found');
    }
    return new MovieListDto(movie);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieListDto> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    Object.assign(movie, updateMovieDto);

    const newMovie = await this.movieRepository.save(movie);

    return new MovieListDto(newMovie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundError('Movie not found');
    }
    await this.movieRepository.remove(movie);
  }
}
