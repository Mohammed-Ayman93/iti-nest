import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if(!task)
      throw `task with id ${id} not found`
    return task;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    console.log(this.tasks);
    
    return task;
  }

  deleteTask(id: string): void {
    this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}