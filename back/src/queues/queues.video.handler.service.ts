import { InjectQueue, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Task } from './types/task';
import { Queue } from 'bull';

@Processor()
export class QueuesVideoHandlerService {
  constructor(@InjectQueue('video') private queue: Queue) {}

  add(task: Task) {
    this.queue.add(task, {
      jobId: task.fileName,
    });
  }

  getInfo() {
    // this.queue.
  }
}
