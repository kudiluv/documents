import { IsMimeType, IsNumber, IsString } from 'class-validator';

export class FileDto {
  @IsString()
  readonly originalName: string;
  @IsString()
  readonly encoding: BufferEncoding;
  @IsMimeType()
  readonly mimetype: string;
  @IsString()
  readonly buffer: string;
  @IsNumber()
  readonly size: number;
}
