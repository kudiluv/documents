import { Process, Processor } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Job } from 'bull';
import { combineLatest, combineLatestAll, lastValueFrom, tap } from 'rxjs';
import { InjectStorage } from './storage/storage.decorator';
import { IStorage } from './storage/types/storage.interface';

@Processor('video')
export class AppService {
  constructor(
    @InjectStorage('documents-diplom') private storageService: IStorage,
    @Inject('PROCESS_VIDEO_SERVICE') private client: ClientProxy,
  ) {}

  @Process()
  async reduceTask(job: Job<any>) {
    const filePath = await this.storageService.downloadFile(job.data.name);
    const respose = await lastValueFrom(this.client.send('', filePath));
    console.log('success', respose.data);
    return respose.data;
  }
}
