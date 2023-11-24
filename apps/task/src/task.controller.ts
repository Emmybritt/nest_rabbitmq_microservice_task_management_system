import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create Task' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTask: CreateTaskDto, @Req() req: Request) {
    const user: any = req.user;
    console.log(user);
    return this.taskService.create(createTask, user.id);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('/:id')
  findeOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTask: UpdateTaskDto) {
    return this.taskService.update(id, updateTask);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
