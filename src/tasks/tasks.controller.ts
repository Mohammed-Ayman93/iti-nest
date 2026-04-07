import { Controller , Get , Post , Delete , Patch , Param , Body, ParseUUIDPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './tasks.model';
import type {Task} from './tasks.model'
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id' , ParseUUIDPipe) id: string): Task {
    return this.tasksService.getTaskById(id);
  }

 @Post()
createTask(@Body() createTaskDto: CreateTaskDto) {
  return this.tasksService.createTask(
    createTaskDto.title,
    createTaskDto.description,
  );
}

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
