import { Movie } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';

interface CreateMovieUseCaseCommand {
  title: string;
  synopsis: string;
  duration: number;
  director: string;
  year: number;
}

@Injectable()
export class CreateMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute({
    title,
    director,
    duration,
    synopsis,
    year,
  }: CreateMovieUseCaseCommand): Promise<Movie> {
    const movie = new Movie({
      title,
      director,
      duration,
      synopsis,
      year,
    });

    const response = await this.movieRepository.create(movie);

    return response;
  }
}
