import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return new Promise(resolve => {
      resolve(this.tasks);
    });
  }

  getTaskFiltered({ status, search }: GetTasksFilterDto): Task[] {
    return this.tasks.filter(item => {
      if (status && !search) {
        return item.status === status;
      }
      if (!status && search) {
        return item.title.includes(search) || item.description.includes(search);
      }
      return (
        item.status === status &&
        (item.title.includes(search ?? '') ||
          item.description.includes(search ?? ''))
      );
    });
  }

  getTaskById(id: number): Task {
    const found = this.tasks.find(item => item.id === id);
    if (!found) {
      throw new NotFoundException(`Task with the given ID ${id} not found`);
    }
    return found;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: number): boolean {
    if (this.tasks.findIndex(item => item.id === id) === -1) {
      throw new NotFoundException(`Task with the given ID ${id} not found`);
    }
    this.tasks = this.tasks.filter(item => item.id !== id);
    return true;
  }

  updateTaskStatus(id: number, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
