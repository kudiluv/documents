import {
  QueryDslQueryContainer,
  SearchTotalHits,
} from '@elastic/elasticsearch/lib/api/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CategoryService } from 'src/category/category.service';
import { FileForIndex } from './dto/file.for.index.dto';
import { SearchParamsDto } from './dto/search.params.dto';
import { SearchResponseDto } from './dto/search.response.dto';
import { FilterParams } from './filter.params';
import { MustParams } from './must.params';
import { IndexedFile } from './types/indexed.file';

@Injectable()
export class SearchService {
  constructor(
    private elasticSearchService: ElasticsearchService,
    private categoryService: CategoryService,
  ) {}

  indexName = 'files';
  pageLimit = 20;

  async search(searchParams: SearchParamsDto): Promise<SearchResponseDto> {
    const params = Object.entries(searchParams);
    const must: QueryDslQueryContainer[] = params.reduce(
      (acc, [key, value]) =>
        value && MustParams[key] ? [MustParams[key](value), ...acc] : acc,
      [],
    );

    const filter: QueryDslQueryContainer[] = params.reduce(
      (acc, [key, value]) =>
        value && FilterParams[key] && FilterParams[key](value)
          ? [FilterParams[key](value), ...acc]
          : acc,
      [],
    );

    const result = await this.elasticSearchService.search<IndexedFile>({
      index: this.indexName,
      _source: ['link', 'type', 'originalName', 'uploadedDate'],
      size: this.pageLimit,
      from: (searchParams.page - 1) * this.pageLimit,
      query: {
        bool: {
          must,
          filter,
        },
      },
    });

    return {
      pages: Math.ceil(
        (result.hits.total as SearchTotalHits).value / this.pageLimit,
      ),
      countItems: (result.hits.total as SearchTotalHits).value,
      items: result.hits.hits.map(({ _id, _source: file }) => ({
        id: _id,
        link: file.link,
        originalName: file.originalName,
        type: file.type,
      })),
    };
  }

  async findById(id: string): Promise<IndexedFile> {
    const response = await this.elasticSearchService.get<IndexedFile>({
      index: this.indexName,
      id,
    });
    return response._source;
  }

  async addToIndex(fileInfo: FileForIndex) {
    return await this.elasticSearchService.index<IndexedFile>({
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

  async removeFromIndex(id: string) {
    await this.findById(id);
    const result = await this.elasticSearchService.delete({
      index: this.indexName,
      id,
    });
  }

  async updateText(id: string, text: string) {
    return await this.elasticSearchService.update<IndexedFile>({
      id,
      index: this.indexName,
      doc: {
        text,
      },
    });
  }
}
