import { Module } from '@nestjs/common';
import { RemoveService } from './remove.service';
import { RemoveController } from './remove.controller';
import { QueuesModule } from 'src/queues/queues.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [QueuesModule, SearchModule],
  providers: [RemoveService],
  controllers: [RemoveController],
})
export class RemoveModule {}
