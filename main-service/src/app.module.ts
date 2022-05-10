import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    UploadModule,
    StorageModule.forRoot({
      type: 'yandex',
      s3config: {
        endpoint: 'https://storage.yandexcloud.net',
        credentials: {
          accessKeyId: 'YCAJETBq7VC4AJXPc9lVhdAxg',
          secretAccessKey: 'YCNr6-1r-CahpbErNNX_lk6LUDbRshybfHZ__N3f',
        },
      },
      localOptions: {
        path: '/tmp',
      },
    }),
    SchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
