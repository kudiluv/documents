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
    return (
      value === 'text/plain' ||
      value === 'application/msword' ||
      value ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      value === 'application/vnd.ms-excel' ||
      value ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      value === 'text/csv' ||
      value === 'application/pdf'
    );
  }

  addTask(uploadedFile: UploadedFileDto) {
    this.queue.add(uploadedFile, {
      jobId: uploadedFile.name,
    });
  }
}
