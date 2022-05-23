import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';
import { QueuesModule } from './queues/queues.module';
import { SearchModule } from './search/search.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './auth/basic-auth.guard';
import { RemoveModule } from './remove/remove.module';

@Module({
  imports: [
    UploadModule,
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
    QueuesModule,
    SearchModule,
    CategoryModule,
    AuthModule,
    RemoveModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
  ],
})
export class AppModule {}
