import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
import { SearchParamsDto } from './dto/search.params.dto';

type MustParams = {
  [key in keyof SearchParamsDto]: (params: any) => QueryDslQueryContainer;
};

export const MustParams: MustParams = {
  fileNameQuery: (str: string) => ({
    regexp: {
      originalName: `.*${str}.*`,
    },
  }),
  textQuery: (str: string) => ({
    match: {
      text: {
        query: str,
      },
    },
  }),
};
