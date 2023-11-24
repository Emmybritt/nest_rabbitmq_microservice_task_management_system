import { PartialType, PickType } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { CreateTask, UpdateTask } from '../interface/task.interface';

export class CreateTaskDto
  extends PickType(Task, [
    'assigned_to',
    'due_date',
    'description',
    'status',
    'title',
  ])
  implements CreateTask {}

export class UpdateTaskDto
  extends PartialType(CreateTaskDto)
  implements UpdateTask {}
