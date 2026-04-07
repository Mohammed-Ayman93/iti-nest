import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.model';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.createTask(
      createTaskDto.title,
      createTaskDto.description,
    );
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}