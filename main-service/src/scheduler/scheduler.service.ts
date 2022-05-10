import { SchedulerVideoService } from './scheduler.video.service';
import { ISchedulerService } from './types/ISchedulerService';
import { Task } from './types/task';

export class SchedulerService {
  schedulers: ISchedulerService[] = [];
  constructor(videoService: SchedulerVideoService) {
  }



  add(fileInfo: Task) {
    
  }
}
