import { USER_REPOSITORY } from '@app/database';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
