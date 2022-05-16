import { DetailTask } from '../types/detail.task';

export class QueueDatailDto {
  tasks: DetailTask[];
  countTasks: number;
  currentPage: number;
  pages: number;
}
