import { Injectable } from '@nestjs/common';
import { MovieM } from '@/domain/model/movie';
import { MovieRepository } from '../../repositories/movie.repositoy';

interface GetMovieUseCaseCommand {}

@Injectable()
export class GetMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({}: GetMovieUseCaseCommand): Promise<MovieM[]> {
    return await this.movieRepository.findMany();
  }
}
