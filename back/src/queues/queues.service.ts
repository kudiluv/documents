import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QueuesVideoService } from './queues.video.service';
import { DetailTask } from './types/detail.task';
import { QueueInfo } from './types/queue.info';
import { IQueueService } from './types/queue.service';
import { Task } from './types/task';

@Injectable()
export class QueuesService {
  private queueServices: IQueueService[] = [];
  constructor(videoService: QueuesVideoService) {
    this.queueServices = [videoService];
  }

  process(task: Task) {
    // if (task.mimetype === 'video/mp4') {
    //   this.videoService.add(task);
    // }
  }

  async infoAboutQueues(): Promise<QueueInfo[]> {
    const promises = this.queueServices.map(({ queue }) =>
      this.infoAboutQueue(queue),
    );
    return await Promise.all(promises);
  }

  private paginate(page = 1) {
    const limit = 10;
    return [(page - 1) * limit, page * limit - 1];
  }

  async getDetails(queueName: string, page = 1): Promise<DetailTask[]> {
    const queueService = this.queueServices.find(
      (service) => service.name === queueName,
    );

    if (!queueService) {
      throw new HttpException('Queue not found', HttpStatus.NOT_FOUND);
    }
    const jobs = await queueService.queue.getJobs(
      ['waiting', 'active'],
      ...this.paginate(page),
    );

    const promises: Promise<DetailTask>[] = jobs.map(async (job) => {
      const status: 'active' | 'waiting' = (await job.isActive())
        ? 'active'
        : 'waiting';
      const data = job.data;
      return { link: data.filePath, orginalName: data.fileName, status };
    });

    return Promise.all(promises);
  }

  private async infoAboutQueue(queue: Queue): Promise<QueueInfo> {
    const workers = (await queue.getWorkers()).length;
    const name = await queue.name;
    const tasksCount = await queue.count();
    const tasksInProcessCount = await queue.getActiveCount();
    return {
      workers,
      name,
      tasksCount,
      tasksInProcessCount,
    };
  }
}
