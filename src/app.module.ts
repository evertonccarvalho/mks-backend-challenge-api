import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MoviesModule } from './movies/movies.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/common/guards/jwt-auth.guard';
// import { DomainModule } from './domain/domain.module';
import { TypeOrmDatabaseModule } from './infra/config/typeorm/typeorm.module';
import { UsersModule } from './infra/users.module';
import { MoviesModule } from './infra/movies.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          ttl: 30,
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        });
        return { store };
      },
    }),
    TypeOrmDatabaseModule,
    UsersModule,
    MoviesModule,
    // AuthModule,
    // DomainModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
