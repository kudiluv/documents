import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CategoryService } from 'src/category/category.service';
import { FileForIndex } from './dto/file.for.index.dto';

@Injectable()
export class SearchService {
  constructor(
    private elasticSearchService: ElasticsearchService,
    private categoryService: CategoryService,
  ) {}

  indexName = 'files';

  async addToIndex(fileInfo: FileForIndex) {
    await this.elasticSearchService.index({
      index: this.indexName,
      id: fileInfo.id,
      document: {
        mimetype: fileInfo.mimetype,
        type: this.categoryService.getCategory(fileInfo.mimetype),
        link: fileInfo.link,
        text: '',
        originalName: fileInfo.originalName,
        uploadedDate: new Date(),
      },
    });
  }

  async updateText(id: string, text: string) {
    await this.elasticSearchService.update({
      id,
      index: this.indexName,
      doc: {
        text,
      },
    });
  }
}
