import { OnGlobalQueueCompleted, Processor } from '@nestjs/bull';
import { SearchService } from 'src/search/search.service';

@Processor('video')
export class QueuesVideoHandlerService {
  constructor(private searchService: SearchService) {}

  @OnGlobalQueueCompleted()
  getInfo(jobId: string, result: string) {
    this.searchService.updateText(jobId, result);
  }
}
