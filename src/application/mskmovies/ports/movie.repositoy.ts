import { Movie } from '@/domain/mskmovies/movie';

export abstract class MovieRepository {
  abstract findMany(): Promise<Movie[]>;
  abstract findById(id: string): Promise<Movie>;
  abstract create(data: Movie): Promise<Movie>;
  abstract update(id: string, data: Movie): Promise<Movie>;
  abstract delete(id: string): Promise<void>;
}
