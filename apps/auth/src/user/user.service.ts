import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUser, UpdateUser } from './interfaces/user.interface';
import { RmqService } from '@app/rmq';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private mqService: RmqService,
  ) {}
  create(createUserDto: CreateUser) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOne<User>({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUser) {
    return this.userRepository.update<User>(
      { ...updateUserDto },
      { where: { id } },
    );
  }

  remove(id: string) {
    return this.userRepository.destroy<User>({ where: { id } });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne<User>({ where: { id } });
  }
}
