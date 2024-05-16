import { MovieM } from '@/domain/model/movie';
import { UpdateMovieDto } from '@/infra/http/movie/dto';

export abstract class MovieRepository {
  abstract findMany(): Promise<MovieM[]>;
  abstract findById(id: string): Promise<MovieM>;
  abstract create(data: MovieM): Promise<MovieM>;
  abstract updateEntity(id: string, data: UpdateMovieDto): Promise<MovieM>;
  abstract delete(id: string): Promise<void>;
}
