import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
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
    BullModule.registerQueue({ name: 'documents' }),
  ],
  providers: [AppService],
})
export class AppModule {}
