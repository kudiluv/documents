import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './upload/upload.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
