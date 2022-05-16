import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesVideoService } from './queues.video.service';
import { QueuesController } from './queues.controller';
import { QueuesVideoHandlerService } from './queues.video.handler.service';
import { SearchModule } from 'src/search/search.module';
import { QueuesDocumentsHandlerService } from './queues.documents.handler.service';
import { QueuesDocumentsService } from './queues.documents.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'video' }, { name: 'documents' }),
    SearchModule,
  ],
  providers: [
    QueuesService,
    QueuesVideoService,
    QueuesVideoHandlerService,
    QueuesDocumentsService,
    QueuesDocumentsHandlerService,
  ],
  exports: [QueuesService],
  controllers: [QueuesController],
})
export class QueuesModule {}
