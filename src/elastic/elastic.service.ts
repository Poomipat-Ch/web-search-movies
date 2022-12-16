import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ElasticService {
  private readonly elasicClient: Client;
  constructor() {
    this.elasicClient = new Client({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    });
  }

  async searchMovie(query: string) {
    return this.elasicClient.search({
      query: {
        multi_match: {
          query: query,
          fields: ['title'],
        },
      },
    });
  }

  async getMovie(movieId: string) {
    return this.elasicClient.get({
      index: 'netflix-movies',
      id: movieId,
    });
  }
}
