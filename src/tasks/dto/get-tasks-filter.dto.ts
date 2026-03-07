import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus, {
    message: `Status must be one of the following values: ${Object.values(TaskStatus).join(', ')}`,
  })
  @IsOptional()
  status?: TaskStatus;

  @IsString({
    message: 'Search must be a string',
  })
  @IsOptional()
  search?: string;
}
