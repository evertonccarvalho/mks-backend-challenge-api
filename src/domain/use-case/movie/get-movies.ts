import { Injectable } from '@nestjs/common';
import { Movie } from '@/domain/model/movie';
import { MovieRepository } from '../../repositories/movie.repositoy';

interface GetMovieUseCaseCommand {}

@Injectable()
export class GetMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({}: GetMovieUseCaseCommand): Promise<Movie[]> {
    return await this.movieRepository.findMany();
  }
}
