import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { MovieType } from 'src/models/movie.model';

@Injectable()
export class ElasticService {
  private readonly index = 'netflix_movies';

  private readonly elasicClient: Client;

  constructor() {
    this.elasicClient = new Client({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    });
  }

  async suggestionSearch(query: string) {
    return this.elasicClient.search<MovieType>({
      index: this.index,
      from: 0,
      size: 5,
      query: {
        match: {
          title: query,
        },
      },
      _source: ['title', 'img'],
    });
  }

  async searchMovie(query: string) {
    return this.elasicClient.search<MovieType>({
      index: this.index,
      from: 0,
      size: 20,
      query: {
        multi_match: {
          query: query,
          fields: ['title', 'synopsis'],
        },
      },
    });
  }

  async getMovie(movieId: string) {
    return this.elasicClient.get<MovieType>({
      index: this.index,
      id: movieId,
    });
  }
}
