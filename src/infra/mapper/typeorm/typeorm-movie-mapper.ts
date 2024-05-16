// import { MovieM } from '@/domain/model/movie';
// import { MovieEntity } from '../../entities/movie.entity';
// import { NotFoundException } from '@nestjs/common';

// export class TypeOrmMovieMapper {
//   static toDomain(entity: MovieEntity): MovieM {
//     if (!entity) {
//       throw new NotFoundException(`Movie not found.`);
//     }
//     const model = new MovieProps({
//       id: entity.id,
//       director: entity.director,
//       title: entity.title,
//       duration: entity.duration,
//       synopsis: entity.synopsis,
//       year: entity.year,
//     });
//     return model;
//   }

//   static toTypeOrm(movie: MovieM) {
//     return {
//       id: movie.id,
//       director: movie.director,
//       title: movie.title,
//       duration: movie.duration,
//       synopsis: movie.synopsis,
//       year: movie.year,
//     };
//   }
// }
