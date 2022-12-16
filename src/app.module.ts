import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticService } from './elastic/elastic.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `/configa/${process.env.NODE_ENV || 'development'}.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ElasticService],
})
export class AppModule {}
