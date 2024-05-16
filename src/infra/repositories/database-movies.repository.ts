import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MovieM } from '@/domain/model/movie';
// import { TypeOrmMovieMapper } from '../mapper/typeorm/typeorm-movie-mapper';
import { MovieRepository } from '@/domain/repositories/movie.repositoy';
import { MovieListDto } from '../http/movie/dto';
import { UserNotFoundError } from '../common/errors';

@Injectable()
export class DatabaseMoviesRepository implements MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async delete(id: string): Promise<void> {
    const entity = await this.movieRepository.findOne({ where: { id: id } });
    if (!entity) {
      throw new UserNotFoundError();
    }
    await this.movieRepository.remove(entity);
  }

  async findById(id: string): Promise<MovieM> {
    const entity = await this.movieRepository.findOne({ where: { id: id } });
    if (!entity) {
      throw new UserNotFoundError();
    }
    return this.toMovie(entity);
  }

  async updateEntity(id: string, movie: MovieListDto): Promise<MovieM> {
    const entity = await this.findById(id);

    entity.title = movie.title;
    entity.synopsis = movie.synopsis;
    entity.duration = movie.duration;
    entity.director = movie.director;
    entity.year = movie.year;

    await this.movieRepository.save(entity);

    return this.toMovie(entity);
  }

  async findMany(): Promise<MovieM[]> {
    const movies = await this.movieRepository.find();
    return movies.map((entity) => this.toMovie(entity));
  }

  async create(movie: MovieM): Promise<MovieM> {
    const data = this.toMovie(movie);
    const entity = this.movieRepository.create(data);
    const createdMovie = await this.movieRepository.save(entity);
    return this.toMovie(createdMovie);
  }

  private toMovie(entity: MovieM): MovieM {
    const movie: MovieM = new MovieM(entity);

    movie.id = entity.id;
    movie.director = entity.director;
    movie.duration = entity.duration;
    movie.synopsis = entity.synopsis;
    movie.title = entity.title;
    movie.year = entity.year;
    return movie;
  }
}
