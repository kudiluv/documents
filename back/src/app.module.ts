import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
import { QueuesModule } from './queues/queues.module';
import { SearchModule } from './search/search.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
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
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    QueuesModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
