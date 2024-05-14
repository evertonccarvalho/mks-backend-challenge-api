import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
