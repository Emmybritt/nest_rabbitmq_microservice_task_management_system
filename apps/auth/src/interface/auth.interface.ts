import { CreateUser } from '../user/interfaces/user.interface';

export type LoginUser = Pick<CreateUser, 'email' | 'password'>;
export type RegisterUser = Omit<CreateUser, 'profile_photo'>;

export type JwtTokenPayload = Omit<CreateUser, 'password'>;
