import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  @IsString()
  duration: number;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsInt()
  year: number;
}
