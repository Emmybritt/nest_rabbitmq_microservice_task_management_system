import {
  Status,
  TaskInterface,
  UpdateTask,
} from 'apps/task/src/interface/task.interface';

export class TaskCreatedEvent {
  id: string;
  title: string;
  creator: string;
  description: string;
  due_date: Date | string;
  status: Status;
  assigned_to: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(public readonly task: TaskInterface) {
    this.id = task.id;
    this.title = task.title;
    this.creator = task.creator;
    this.description = task.description;
    this.due_date = task.due_date;
    this.status = task.status;
    this.assigned_to = task.assigned_to;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export class TaskAssignedEvent {
  constructor(public readonly taskId: string, public readonly userId: string) {}
}

export class TaskUpdatedEvent {
  constructor(
    public readonly taskId: string,
    public readonly update: Partial<UpdateTask>,
  ) {}
}

export class TaskDueEvent {
  constructor(public readonly taskId: string) {}
}

export class TaskDeletedEvent {
  constructor(private readonly taskId: string) {}
}
