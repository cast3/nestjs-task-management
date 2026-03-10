import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { formatDateToColombia } from '../common/utils/date-format';
import { TaskStatus } from './task.model';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('varchar', { length: 1000 })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @CreateDateColumn()
  @Transform(
    ({ value }: { value?: Date }) =>
      formatDateToColombia(value, { pattern: 'DD/MM/YYYY HH:mm' }),
    {
      toPlainOnly: true,
    }
  )
  createdAt: Date;

  @UpdateDateColumn()
  @Transform(
    ({ value }: { value?: Date }) =>
      formatDateToColombia(value, { pattern: 'DD-MM-YYYY HH:mm' }),
    {
      toPlainOnly: true,
    }
  )
  updatedAt: Date;
}
