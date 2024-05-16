import { Entity } from '@/core/entities/entity';

export interface MovieProps {
  id?: string;
  title: string;
  synopsis: string;
  duration: number;
  director: string;
  year: number;
}

export class Movie extends Entity<MovieProps> {
  constructor(props: MovieProps) {
    super(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get synopsis(): string {
    return this.props.synopsis;
  }

  get duration(): number {
    return this.props.duration;
  }

  get director(): string {
    return this.props.director;
  }

  get year(): number {
    return this.props.year;
  }
}
