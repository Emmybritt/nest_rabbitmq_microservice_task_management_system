import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { tasksProviders } from './task.provider';
import { DatabaseModule } from '@app/database';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/rmq';
import { AUTH_SERVICE } from './constants/service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TASK_QUEUE: Joi.string().required(),
      }),
      envFilePath: '../../../.env',
    }),
    RmqModule.register({ name: AUTH_SERVICE }),
  ],
  controllers: [TaskController],
  providers: [TaskService, ...tasksProviders],
})
export class TaskModule {}
