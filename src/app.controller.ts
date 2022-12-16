import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ElasticService } from './elastic/elastic.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly elasticService: ElasticService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/movies')
  searchMovies() {
    return this.elasticService.searchMovie('');
  }
}
