import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../ports/movie.repositoy';

@Injectable()
export class GetMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string): Promise<any> {
    return await this.movieRepository.findById(id);
  }
}
