import { OnGlobalQueueCompleted } from '@nestjs/bull';
import { Queue } from 'bull';

export class SchedulerHandler {
  constructor(private queue: Queue) {}

  @OnGlobalQueueCompleted()
  onCompleted(job, result) {
    console.log(result);
  }
}
