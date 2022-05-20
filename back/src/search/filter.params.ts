import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { Categories } from 'src/category/types/categories';
import { SearchParamsDto } from './dto/search.params.dto';

type FilterParams = {
  [key in keyof SearchParamsDto]: (params: any) => QueryDslQueryContainer;
};

export const FilterParams: FilterParams = {
  type: (categories: Categories[]) => {
    if (!categories.length) return;
    return {
      terms: {
        type: categories,
      },
    };
  },
  startDate: (startDate: Date) => {
    return {
      range: {
        uploadedDate: {
          gte: startDate.toISOString(),
        },
      },
    };
  },
  endDate: (startDate: Date) => {
    return {
      range: {
        uploadedDate: {
          lte: startDate.toISOString(),
        },
      },
    };
  },
};
