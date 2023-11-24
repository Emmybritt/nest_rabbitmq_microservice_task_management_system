import { UserInterface } from 'apps/auth/src/user/interfaces/user.interface';

export class UserCreatedEvent {
  id: string;
  full_name: string;
  email: string;
  phone_no: string;
  profile_photo?: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(user: UserInterface) {
    this.id = user.id;
    this.full_name = user.full_name;
    this.email = user.email;
    this.phone_no = user.phone_no;
    this.profile_photo = user.profile_photo;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
