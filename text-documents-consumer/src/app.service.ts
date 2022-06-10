import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import * as reader from 'any-text';
import { Job } from 'bull';
import { InjectStorage } from './storage/storage.decorator';
import { IStorage } from './storage/types/storage.interface';
import * as fs from 'fs';
import * as textract from 'textract';

@Processor('documents')
export class AppService {
  constructor(
    @InjectStorage('documents-diploma') private storageService: IStorage,
  ) {}

  @Process({ concurrency: 4 })
  async reduceTask(job: Job<any>) {
    console.log('strarted');
    const filePath = await this.storageService.downloadFile(job.data.name);
    const extractedText = await new Promise<string>((resolve) =>
      textract.fromFileWithPath(filePath, (e, text) => resolve(text)),
    );
    console.log(extractedText);
    return extractedText;
  }
}
