import { OnGlobalQueueCompleted, Processor } from '@nestjs/bull';
import { SearchService } from 'src/search/search.service';

@Processor('documents')
export class QueuesDocumentsHandlerService {
  constructor(private searchService: SearchService) {}

  @OnGlobalQueueCompleted()
  getInfo(jobId: string, result: string) {
    console.log(result);
    this.searchService.updateText(jobId, result);
  }
}
