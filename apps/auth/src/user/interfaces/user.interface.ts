export interface UserInterface {
  id: string;
  full_name: string;
  email: string;
  password: string;
  phone_no: string;
  profile_photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = Pick<
  UserInterface,
  'email' | 'full_name' | 'password' | 'phone_no' | 'profile_photo'
>;

export type UpdateUser = Partial<CreateUser>;
