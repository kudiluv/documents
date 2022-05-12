import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { FileForIndex } from './dto/file.for.index.dto';

@Injectable()
export class SearchService {
  constructor(private elasticSearchService: ElasticsearchService) {}

  async addToIndex(fileInfo: FileForIndex) {
    await this.elasticSearchService.index({
      index: 'files',
      id: fileInfo.id,
      document: {
        mimetype: fileInfo.mimetype,
        link: fileInfo.link,
        text: '',
      },
    });
  }
}
