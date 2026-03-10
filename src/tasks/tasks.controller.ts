import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTasStatuskDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    if (status || search) {
      return this.tasksService.getTaskFiltered({ status, search });
    }
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task | undefined> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() { status }: UpdateTasStatuskDto
  ): Promise<Task | null> {
    return await this.tasksService.updateTaskStatus(id, status);
  }
}
