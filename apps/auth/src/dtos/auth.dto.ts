import { OmitType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/user.dto';
import { LoginUser, RegisterUser } from '../interface/auth.interface';

export class LoginUserDto
  extends PickType(CreateUserDto, ['email', 'password'])
  implements LoginUser {}

export class RegisterUserDto
  extends OmitType(CreateUserDto, ['profile_photo'])
  implements RegisterUser {}
