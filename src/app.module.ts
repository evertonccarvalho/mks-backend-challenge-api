import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MoviesModule } from './movies/movies.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MksmoviesModule } from './application/mskmovies/mksmovies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // DatabaseModule,
    // UsersModule,
    // AuthModule,
    TypeOrmModule,
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
    MksmoviesModule,
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
