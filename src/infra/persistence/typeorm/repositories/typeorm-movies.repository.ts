import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Movie } from '@/domain/mskmovies/movie';
import { TypeOrmMovieMapper } from '../mapper/typeorm-movie-mapper';
import { MovieRepository } from '@/application/mskmovies/ports/movie.repositoy';

@Injectable()
export class TyperOrmMoviesRepository implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  findById(id: string): Promise<Movie> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Movie): Promise<Movie> {
    throw new Error('Method not implemented.');
  }

  async findMany(): Promise<Movie[]> {
    const movie = await this.movieRepository.find();
    return movie.map((item) => TypeOrmMovieMapper.toDomain(item));
  }

  async create(movie: Movie): Promise<Movie> {
    const data = TypeOrmMovieMapper.toTypeOrm(movie);
    const entity = await this.movieRepository.create(data);
    return TypeOrmMovieMapper.toDomain(entity);
  }
}
