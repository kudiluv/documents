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
    @InjectStorage('documents-diploma') private storageService: IStorage,
  ) {}

  @Process({ concurrency: 4 })
  async reduceTask(job: Job<any>) {
    const filePath = await this.storageService.downloadFile(job.data.name);
    const respose = await reader.getText(filePath);
    const cleanedText = respose.replace(/(\r\n|\n|\r|\t)/gm, ' ');
    console.log('success', respose);
    return cleanedText;
  }
}
