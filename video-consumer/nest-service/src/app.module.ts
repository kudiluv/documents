import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    StorageModule.forRoot({
      type: 'yandex',
      s3config: {
        endpoint: 'https://storage.yandexcloud.net',
        credentials: {
          accessKeyId: 'YCAJE2ouJ1KxeAEhJsApFg1JL',
          secretAccessKey: 'YCP7T8X7rV6CCsPWxjo8GJEZVXhgBOfr1t0Qm8fA',
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
    ClientsModule.register([
      {
        name: 'PROCESS_VIDEO_SERVICE',
        transport: Transport.TCP,
        options: { port: 9090 },
      },
    ]),
    BullModule.registerQueue({ name: 'video' }),
  ],
  providers: [AppService],
})
export class AppModule {}
