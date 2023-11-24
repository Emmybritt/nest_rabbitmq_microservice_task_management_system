import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './dtos/auth.dto';

@ApiBearerAuth()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User login endpoint',
  })
  @HttpCode(HttpStatus.OK)
  @Post('user/login')
  async login(@Body(new ValidationPipe()) user: LoginUserDto) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Register user' })
  @Post('user/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }
}
