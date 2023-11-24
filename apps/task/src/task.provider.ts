import { TASK_REPOSITORY } from '@app/database';
import { Task } from './entities/task.entity';

export const tasksProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
