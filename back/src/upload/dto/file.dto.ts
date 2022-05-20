import { IsString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class FileDto {
  @IsFile()
  readonly file: MemoryStoredFile;
  @IsString()
  readonly fileName: string;
}
