import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IQueueService } from './types/queue.service';
import { UploadedFileDto } from 'src/upload/dto/uploaded.file.dto';

@Injectable()
export class QueuesDocumentsService implements IQueueService {
  constructor(@InjectQueue('documents') public queue: Queue) {}

  name = 'documents';

  mimetypeTrigger(value: string) {
    const result = [
      /text/,
      /application\/msword/,
      /application\/vnd.openxmlformats-officedocument.wordprocessingml.document/,
      /application\/vnd.ms-excel/,
      /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/,
      /application\/pdf/,
      /application\/vnd.openxmlformats-officedocument.presentationml.presentation/
    ].findIndex((mimeRegExp) => mimeRegExp.test(value))
    return result !== -1 && true || false;
  }

  addTask(uploadedFile: UploadedFileDto) {
    this.queue.add(uploadedFile, {
      jobId: uploadedFile.name,
    });
  }
}
