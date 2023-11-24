import { ApiProperty } from '@nestjs/swagger';
import { User } from 'apps/auth/src/user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';
import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Status, TaskInterface } from '../interface/task.interface';

@Table
export class Task extends Model<Task> implements TaskInterface {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, unique: true })
  id: string;

  @ApiProperty({ type: String, example: UUIDV4() })
  @ForeignKey(() => User)
  @IsNotEmpty()
  @Column({ allowNull: false, type: DataType.STRING })
  creator: string;

  @ApiProperty({ description: 'Task title', example: 'Video Implementation' })
  @IsNotEmpty()
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'This is a task description',
  })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  description: string;

  @ApiProperty({ type: Date, example: new Date() })
  @IsNotEmpty()
  @Column({ type: DataType.DATE, allowNull: false })
  due_date: Date | string;

  @ApiProperty({ type: String, example: 'pending' })
  @IsNotEmpty()
  @Column({ allowNull: true, type: DataType.STRING })
  status: Status;

  @ApiProperty({ type: String, example: '4dhn9wij29ue9rujsijwwj' })
  @ForeignKey(() => User)
  @IsNotEmpty()
  @Column({ allowNull: false, type: DataType.STRING })
  assigned_to: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
