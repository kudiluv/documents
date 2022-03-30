import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        options: {
          host: process.env.DOCUMENTS_HOST,
          port: process.env.DOCUMENTS_PORT,
        },
      },
    ]),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
