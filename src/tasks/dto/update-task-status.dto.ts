import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTasStatuskDto {
  @IsDefined({
    message: 'Status is required',
  })
  @IsNotEmpty({
    message: 'Status should not be empty',
  })
  @IsEnum(TaskStatus, {
    message: `Status must be one of the following values: ${Object.values(TaskStatus).join(', ')}`,
  })
  status: TaskStatus;
}
