import { Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Processor('video')
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
