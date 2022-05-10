import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SchedulerHandler } from './scheduler.handler';
import { ISchedulerService } from './types/ISchedulerService';
import { Task } from './types/task';

@Injectable()
export class SchedulerVideoService implements ISchedulerService {
  private schedulerHandler: SchedulerHandler;
  constructor(@InjectQueue('video') private queue: Queue) {
    this.schedulerHandler = new SchedulerHandler(queue);
  }

  triggerMimetype(mimetype) {
    if (mimetype === 'video') {
      return true;
    }
    return false;
  }

  async add(task: Task) {
    this.queue.add(task, {
      jobId: task.fileName,
    });
  }
}
