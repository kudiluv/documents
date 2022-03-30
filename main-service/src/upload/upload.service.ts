import { Injectable } from '@nestjs/common';

import { UploadedFileDto } from './dto/uploaded.file.dto';
import { Storage } from 'src/storage/storage.decorator';
import { IStorage } from 'src/storage/types/storage.interface';
import { FileDto } from './dto/file.dto';

@Injectable()
export class UploadService {
  constructor(@Storage('documents-diplom') private storageServise: IStorage) {}

  async upload(file: FileDto): Promise<UploadedFileDto> {
    console.log(file);
    const res = await this.storageServise.uploadBuffer({
      originalName: file.originalName,
      buffer: Buffer.from(file.buffer, 'base64'),
      encoding: file.encoding,
    });
    return {
      name: res.name,
      location: res.location,
    };
  }
}
