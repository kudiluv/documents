import { Task } from './task';

export interface ISchedulerService {
  add: (task: Task) => Promise<void>;
  triggerMimetype: (minmetype: string) => boolean;
}
