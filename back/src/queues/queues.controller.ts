import { Controller, Get, Param } from '@nestjs/common';
import { QueuesService } from './queues.service';

@Controller('queues')
export class QueuesController {
  constructor(private queuesService: QueuesService) {}

  @Get()
  getInfo() {
    return this.queuesService.infoAboutQueues();
  }

  @Get('/:name')
  getDetatils(@Param('name') name: string) {
    return this.queuesService.getDetails(name);
  }
}
