import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  JwtTokenPayload,
  LoginUser,
  RegisterUser,
} from './interface/auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUser: RegisterUser): Promise<any> {
    const result = await this.userService.findOneByEmail(registerUser.email);
    if (result) throw new BadRequestException('Email already exist');
    return await this.userService.create(registerUser);
  }

  async login(loginUser: LoginUser): Promise<{
    status: boolean;
    user: JwtTokenPayload;
    token: string;
    msg: string;
  }> {
    const result = await this.userService.findOneByEmail(loginUser.email);
    if (!result) throw new NotFoundException('Incorrect username or password');
    const passwordMatch = this.compareHashedData(
      loginUser.password,
      result.password,
    );
    const val = result['dataValues'];
    const user: JwtTokenPayload = {
      full_name: val.full_name,
      email: val.email,
      phone_no: val.phone_no,
      profile_photo: val.profile_photo,
    };

    if (!passwordMatch)
      throw new NotFoundException('Incorrect username or password');
    const token = await this.generateTokens(user);
    return { status: true, user, token, msg: 'Login was successfull' };
  }

  private async compareHashedData(data: string, encrypted: string) {
    const match = await bcrypt.compare(data, encrypted);
    return match;
  }

  private async generateTokens(user: JwtTokenPayload) {
    const token = await this.jwtService.signAsync(user, {
      expiresIn: 60 * 15,
      secret: process.env.JWTKEY,
    });
    return token;
  }
}
