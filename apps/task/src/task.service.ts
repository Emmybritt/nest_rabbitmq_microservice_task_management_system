import { RmqService } from '@app/rmq';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTask, UpdateTask } from './interface/task.interface';
import { EXCHANGE, EXCHANGE_ROUTE } from '@app/rmq/constant';
import {
  TaskAssignedEvent,
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from 'libs/data/events/task.event';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY') private taskRepository: typeof Task,
    private mqService: RmqService,
  ) {}
  async create(task: CreateTask, creator: string): Promise<Task> {
    try {
      const newTask = await this.taskRepository
        .create({ ...task, creator })
        .then((task) => {
          this.mqService.publish(
            EXCHANGE.apiTask,
            EXCHANGE_ROUTE.taskCreated,
            new TaskCreatedEvent(task),
          );
          return task;
        });
      return newTask;
    } catch (error) {
      throw error;
    }
  }

  async assignTask(taskId: string, assigned_to: string) {
    return await this.taskRepository
      .update<Task>({ assigned_to }, { where: { id: taskId } })
      .then((assignTask) => {
        this.mqService.publish(
          EXCHANGE.apiTask,
          EXCHANGE_ROUTE.taskAssigned,
          new TaskAssignedEvent(taskId, assigned_to),
        );
        return assignTask;
      });
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.findAll<Task>();
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne<Task>({ where: { id } });
  }

  async update(id: string, updateTask: UpdateTask) {
    return this.taskRepository
      .update<Task>({ ...updateTask }, { where: { id } })
      .then(() => {
        this.mqService.publish(
          EXCHANGE.apiTask,
          EXCHANGE_ROUTE.taskUpdated,
          new TaskUpdatedEvent(id, updateTask),
        );
      });
  }

  async remove(id: string) {
    return this.taskRepository.destroy<Task>({ where: { id } }).then((task) => {
      this.mqService.publish(
        EXCHANGE.apiTask,
        EXCHANGE_ROUTE.taskDeleted,
        new TaskDeletedEvent(id),
      );
    });
  }
}
