import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { MovieEntity } from '../entities/movie.entity';
import { MovieListDto } from '../dto/movies-list.dto.ts';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { CreateMovieDto } from '../dto/create-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<CreateMovieDto> {
    const movie = await this.movieRepository.save(createMovieDto);
    return movie;
  }

  async findAll(): Promise<MovieListDto[]> {
    const movies = await this.movieRepository.find();
    return movies.map((movie) => new MovieListDto(movie));
  }

  async findOne(id: string): Promise<MovieListDto> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return new MovieListDto(movie);
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<UpdateMovieDto> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    Object.assign(movie, updateMovieDto);
    const updatedMovie = await this.movieRepository.save(movie);
    return new MovieListDto(updatedMovie);
  }

  async remove(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.remove(movie);
  }
}
