import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Movie } from '@/domain/mskmovies/movie';
import { TypeOrmMovieMapper } from '../mapper/typeorm-movie-mapper';
import { MovieRepository } from '@/application/mskmovies/ports/movie.repositoy';

@Injectable()
export class TypeOrmMoviesRepository implements MovieRepository {
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

  async update(id: string, data: Movie): Promise<Movie> {
    const movieToUpdate = await this.movieRepository.findOne({
      where: { id: id },
    });

    movieToUpdate.title = data.title;
    movieToUpdate.director = data.director;
    movieToUpdate.year = data.year;

    const updatedMovie = await this.movieRepository.save(movieToUpdate);
    return TypeOrmMovieMapper.toDomain(updatedMovie);
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
