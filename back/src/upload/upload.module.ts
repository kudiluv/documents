import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { QueuesModule } from 'src/queues/queues.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
    QueuesModule,
    SearchModule,
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
