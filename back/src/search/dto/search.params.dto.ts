import { Transform, Type } from 'class-transformer';
import { Categories } from 'src/category/types/categories';

export class SearchParamsDto {
  fileNameQuery?: string;
  textQuery?: string;
  type?: Categories[];
  @Type(() => Date)
  startDate?: Date;
  @Type(() => Date)
  endDate?: Date;
}
