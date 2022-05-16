import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CategoryModule } from 'src/category/category.module';

console.log(process.env.ELASTIC_SEARCH_HOST);

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTIC_SEARCH_HOST,
    }),
    CategoryModule,
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
