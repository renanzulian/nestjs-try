import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../models/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  createUserDefault(email: string, password: string): Promise<Users> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = new Users();
        newUser.email = email;
        newUser.password = password;
        const result = await this.userRepository.save(newUser);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  findOneUser(id: number): Promise<Users> {
    return this.userRepository.findOne(id);
  }

  findAllActiveUsers(): Promise<Users[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }
}
