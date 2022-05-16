import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Task } from './types/task';
import { Queue } from 'bull';
import { QueueInfo } from './types/queue.info';
import { IQueueService } from './types/queue.service';
import { UploadedFileDto } from 'src/upload/dto/uploaded.file.dto';

@Injectable()
export class QueuesVideoService implements IQueueService {
  constructor(@InjectQueue('video') public queue: Queue) {}

  name = 'video';

  mimetypeTrigger(value: string) {
    return value.includes('video');
  }

  addTask(uploadedFile: UploadedFileDto) {
    this.queue.add(uploadedFile, {
      jobId: uploadedFile.name,
    });
  }
}
