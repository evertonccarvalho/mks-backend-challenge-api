import { Movie } from '@/domain/mskmovies/movie';

export abstract class MovieRepository {
  abstract findMany(): Promise<Movie[]>;
  abstract create(data: Movie): Promise<Movie>;
}
