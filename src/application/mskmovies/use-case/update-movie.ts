import { Movie } from '@/domain/mskmovies/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../ports/movie.repositoy';

interface UpdateMovieUseCaseRequest {
  title?: string;
  synopsis?: string;
  duration?: number;
  director?: string;
  year?: number;
}

@Injectable()
export class UpdateMovieUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(id: string, data: UpdateMovieUseCaseRequest): Promise<Movie> {
    console.log(data);
    return await this.movieRepository.update(id, data);
  }
}
