export enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export interface TaskInterface {
  id: string;
  title: string;
  creator: string;
  description: string;
  due_date: Date | string;
  status: Status;
  assigned_to: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTask = Omit<
  TaskInterface,
  'updatedAt' | 'createdAt' | 'id' | 'creator'
>;

export type UpdateTask = Partial<CreateTask>;
