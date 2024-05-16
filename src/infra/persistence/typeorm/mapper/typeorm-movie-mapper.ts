import { Movie } from '@/domain/mskmovies/movie';
import { MovieEntity } from '../entities/movie.entity';
import { NotFoundException } from '@nestjs/common';

export class TypeOrmMovieMapper {
  static toDomain(entity: MovieEntity): Movie {
    if (!entity) {
      throw new NotFoundException(`Movie not found.`);
    }
    const model = new Movie({
      id: entity.id,
      director: entity.director,
      title: entity.title,
      duration: entity.duration,
      synopsis: entity.synopsis,
      year: entity.year,
    });
    return model;
  }

  static toTypeOrm(movie: Movie) {
    return {
      director: movie.director,
      title: movie.title,
      duration: movie.duration,
      synopsis: movie.synopsis,
      year: movie.year,
    };
  }
}
