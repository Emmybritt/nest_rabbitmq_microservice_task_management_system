import { PartialType, PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUser, UpdateUser } from '../interfaces/user.interface';

export class CreateUserDto
  extends PickType(User, [
    'full_name',
    'email',
    'password',
    'profile_photo',
    'phone_no',
  ])
  implements CreateUser {}

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UpdateUser {}
