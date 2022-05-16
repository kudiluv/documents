import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import * as reader from 'any-text';
import { Job } from 'bull';
import { InjectStorage } from './storage/storage.decorator';
import { IStorage } from './storage/types/storage.interface';
import * as fs from 'fs';

@Processor('documents')
export class AppService {
  constructor(
    @InjectStorage('documents-diplom') private storageService: IStorage,
  ) {}

  @Process({ concurrency: 4 })
  async reduceTask(job: Job<any>) {
    const filePath = await this.storageService.downloadFile(job.data.name);
    const respose = await reader.getText(filePath);
    console.log('success', respose);
    return respose;
  }
}
