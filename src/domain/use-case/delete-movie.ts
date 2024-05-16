import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repositories/movie.repositoy';

@Injectable()
export class DeleteMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
