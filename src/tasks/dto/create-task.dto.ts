import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsDefined({
    message: 'Title is required',
  })
  @IsNotEmpty({
    message: 'Title should not be empty',
  })
  @IsString({
    message: 'Title must be a string',
  })
  title: string;

  @IsDefined({
    message: 'Description is required',
  })
  @IsNotEmpty({
    message: 'Description should not be empty',
  })
  @IsString({
    message: 'Description must be a string',
  })
  description: string;
}
