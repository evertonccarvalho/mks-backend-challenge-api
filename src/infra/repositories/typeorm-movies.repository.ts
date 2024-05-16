import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Movie } from '@/domain/model/movie';
import { TypeOrmMovieMapper } from '../persistence/typeorm/mapper/typeorm-movie-mapper';
import { MovieRepository } from '@/domain/repositories/movie.repositoy';

@Injectable()
export class DatabaseMoviesRepository implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async delete(id: string): Promise<void> {
    const entity = await this.movieRepository.findOne({ where: { id: id } });

    await this.movieRepository.remove(entity);
  }

  async findById(id: string): Promise<Movie> {
    const entity = await this.movieRepository.findOne({ where: { id: id } });
    return TypeOrmMovieMapper.toDomain(entity);
  }

  async update(id: string, movie: Movie): Promise<Movie> {
    const preparedData = TypeOrmMovieMapper.toTypeOrm(movie);
    const updatedEntity = await this.movieRepository.preload({
      ...preparedData,
      id,
    });
    return TypeOrmMovieMapper.toDomain(updatedEntity);
  }

  async findMany(): Promise<Movie[]> {
    const movies = await this.movieRepository.find();
    return movies.map((entity) => TypeOrmMovieMapper.toDomain(entity));
  }

  async create(movie: Movie): Promise<Movie> {
    const data = TypeOrmMovieMapper.toTypeOrm(movie);
    const entity = this.movieRepository.create(data);
    const createdMovie = await this.movieRepository.save(entity);
    return TypeOrmMovieMapper.toDomain(createdMovie);
  }
}
