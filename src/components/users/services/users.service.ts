import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUserDefault(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        const result = await this.userRepository.save(newUser);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  findOneUser(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findAllActiveUsers(): Promise<User[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }
}
