import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly dataSource: DataSource
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskFiltered({
    status,
    search,
  }: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        status,
        title: search ? Like(`%${search}%`) : undefined,
        description: search ? Like(`%${search}%`) : undefined,
      },
    });
  }

  async getTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  createTask(dto: CreateTaskDto): Promise<Task> {
    return this.dataSource.transaction('SERIALIZABLE', async manager => {
      const taskRepository = manager.getRepository(Task);
      const task = taskRepository.create({
        title: dto.title,
        description: dto.description,
        status: TaskStatus.OPEN,
      });
      return await taskRepository.save(task);
    });
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.remove(task, {
      transaction: true,
    });
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
