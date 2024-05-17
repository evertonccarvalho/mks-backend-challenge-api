import { CreateMoviesTable1715901651316 } from 'database/migrations/1715901651316-CreateMoviesTable';
import { CreateUsersTable1715901992571 } from 'database/migrations/1715901992571-CreateUsersTable';
import { MovieEntity } from '@/infra/entities/movie.entity';
import { UserEntity } from '@/infra/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (
  configSerice: ConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: configSerice.get('DB_HOST'),
    port: Number(configSerice.get('DB_PORT')),
    username: configSerice.get('DB_USER'),
    password: configSerice.get('DB_PASS'),
    database: configSerice.get('DB_NAME'),
    entities: [UserEntity, MovieEntity],
    migrationsRun: true,
    migrations: [CreateMoviesTable1715901651316, CreateUsersTable1715901992571],
    synchronize: false,
  }) as TypeOrmModuleOptions;
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmDatabaseModule {}
