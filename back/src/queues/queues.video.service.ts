import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Task } from './types/task';
import { Queue } from 'bull';
import { QueueInfo } from './types/queue.info';
import { IQueueService } from './types/queue.service';

@Injectable()
export class QueuesVideoService implements IQueueService {
  constructor(@InjectQueue('video') public queue: Queue) {}

  name = 'video';

  add(task: Task) {
    this.queue.add(task, {
      jobId: task.fileName,
    });
  }
}
