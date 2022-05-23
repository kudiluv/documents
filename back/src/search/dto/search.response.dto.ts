import { FileResponsedto } from './file.resopnse.dto';

export class SearchResponseDto {
  pages: number;
  items: FileResponsedto[];
  countItems: number;
}
