import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SearchParamsDto } from './dto/search.params.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post()
  search(@Body() dto: SearchParamsDto) {
    return this.searchService.search(dto);
  }
}
