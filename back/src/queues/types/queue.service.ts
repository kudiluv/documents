import { Queue } from 'bull';
import { UploadedFileDto } from 'src/upload/dto/uploaded.file.dto';
import { Task } from './task';

export interface IQueueService {
  name: string;
  mimetypeTrigger: (value: string) => boolean;
  addTask: (uploadedFile: UploadedFileDto) => void;
  queue: Queue;
}
