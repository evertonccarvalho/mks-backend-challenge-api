import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
