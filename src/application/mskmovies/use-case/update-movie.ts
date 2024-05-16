import { Movie } from '@/domain/mskmovies/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../ports/movie.repositoy';

interface UpdateMovieUseCaseRequest {
  id: string;
  title?: string;
  synopsis?: string;
  duration?: number;
  director?: string;
  year?: number;
}

@Injectable()
export class UpdateMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute({
    id,
    title,
    director,
    duration,
    synopsis,
    year,
  }: UpdateMovieUseCaseRequest): Promise<Movie> {
    const movie = new Movie({
      title,
      director,
      duration,
      synopsis,
      year,
    });
    const response = await this.movieRepository.update(id, movie);

    return response;
  }
}
