import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
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
  searchMovies(@Query('q') query: string) {
    if (!query) {
      throw new HttpException('Query is empty!!!', HttpStatus.BAD_REQUEST);
    }
    return this.elasticService.searchMovie(query);
  }

  @Get('/movies/suggest')
  searchSuggestion(@Query('q') query: string) {
    if (!query) {
      throw new HttpException('Query is empty!!!', HttpStatus.BAD_REQUEST);
    }
    return this.elasticService.suggestionSearch(query);
  }

  @Get('/movies/:id')
  getMovie(@Param('id') movieId: string) {
    return this.elasticService.getMovie(movieId);
  }
}
