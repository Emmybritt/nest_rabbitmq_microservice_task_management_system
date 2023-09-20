import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserInterface } from '../interfaces/user.interface';

@Table
export class User extends Model<User> implements UserInterface {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, unique: true })
  id: string;

  @ApiProperty({ description: 'User fullname', example: 'Ogwu Emmanuel Berit' })
  @IsNotEmpty()
  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string;

  @ApiProperty({
    description: 'User EmailAddress',
    example: 'beritogwu@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({ type: String, example: '1234' })
  @IsNotEmpty()
  @Column({ type: DataType.STRING(700), allowNull: true })
  password: string;

  @ApiProperty({ type: String, example: '+2347016588973' })
  @IsNotEmpty()
  @Column({ allowNull: true, type: DataType.STRING })
  phone_no: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  profile_photo: string;

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
