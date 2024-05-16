import { Movie } from '@/domain/mskmovies/movie';
import { UpdateMovieDto } from '@/infra/http/dto';

export abstract class MovieRepository {
  abstract findMany(): Promise<Movie[]>;
  abstract findById(id: string): Promise<Movie>;
  abstract create(data: Movie): Promise<Movie>;
  abstract update(id: string, data: UpdateMovieDto): Promise<Movie>;
  abstract delete(id: string): Promise<void>;
}
