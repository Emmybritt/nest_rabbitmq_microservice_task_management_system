import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserInterface } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';

export type JwtPayloadAttr = Pick<
  UserInterface,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'email'
  | 'full_name'
  | 'phone_no'
  | 'profile_photo'
>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }
  async validate(payload: JwtPayloadAttr) {
    const user = await this.userService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }
    return payload;
  }
}
