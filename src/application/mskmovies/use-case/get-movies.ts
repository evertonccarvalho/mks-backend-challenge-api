import { Injectable } from '@nestjs/common';
import { Movie } from '@/domain/mskmovies/movie';
import { MovieRepository } from '../ports/movie.repositoy';

interface GetMovieUseCaseCommand {}

@Injectable()
export class GetMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute({}: GetMovieUseCaseCommand): Promise<Movie[]> {
    const response = await this.movieRepository.findMany();

    return response;
  }
}
