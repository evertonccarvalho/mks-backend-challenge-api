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
    migrations: ['database/migrations/**/*{.ts,.js}'],
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
