import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesVideoService } from './queues.video.service';
import { QueuesController } from './queues.controller';

@Module({
  imports: [BullModule.registerQueue({ name: 'video' })],
  providers: [QueuesService, QueuesVideoService],
  exports: [QueuesService],
  controllers: [QueuesController],
})
export class QueuesModule {}
