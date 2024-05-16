import { Movie } from '@/domain/model/movie';
import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/movie.repositoy';

interface UpdateMovieUseCaseRequest {
  title?: string;
  synopsis?: string;
  duration?: number;
  director?: string;
  year?: number;
}

@Injectable()
export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string, data: UpdateMovieUseCaseRequest): Promise<Movie> {
    return await this.movieRepository.updateEntity(id, data);
  }
}
