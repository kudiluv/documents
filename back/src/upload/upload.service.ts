import { Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { UploadedFileDto } from './dto/uploaded.file.dto';
import { QueuesService } from 'src/queues/queues.service';
import { SearchService } from 'src/search/search.service';
import { InjectStorage } from 'src/storage/storage.decorator';
import { IStorage } from 'src/storage/types/storage.interface';

@Injectable()
export class UploadService {
  constructor(
    @InjectStorage('documents-diploma') private storageServise: IStorage,
    private queuesService: QueuesService,
    private searchService: SearchService,
  ) {}

  async upload(file: Express.Multer.File): Promise<UploadedFileDto> {
    const res = await this.storageServise.uploadBuffer({
      buffer: file.buffer,
      encoding: 'base64',
      originalName: file.originalname,
    });

    const uploadedFile = {
      originalName: file.originalname,
      name: res.name,
      link: res.location,
      mimetype: file.mimetype,
    };

    this.queuesService.process(uploadedFile);
    await this.searchService.addToIndex({
      id: res.name,
      link: res.location,
      mimetype: file.mimetype,
      originalName: file.originalname,
    });
    return uploadedFile;
  }
}
