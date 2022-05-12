import { Queue } from 'bull';

export interface IQueueService {
  name: string;
  queue: Queue;
}
