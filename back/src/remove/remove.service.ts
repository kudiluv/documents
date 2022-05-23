import { Injectable } from '@nestjs/common';
import { QueuesService } from 'src/queues/queues.service';
import { SearchService } from 'src/search/search.service';
import { InjectStorage } from 'src/storage/storage.decorator';
import { IStorage } from 'src/storage/types/storage.interface';

@Injectable()
export class RemoveService {
  constructor(
    private queuesService: QueuesService,
    private searchService: SearchService,
    @InjectStorage('documents-diploma') private storage: IStorage,
  ) {}
  async remove(id: string) {
    await this.searchService.removeFromIndex(id);
    await this.queuesService.deleteTasksAllById(id);
    await this.storage.deleteFile(id);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
