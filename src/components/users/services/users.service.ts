import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../models/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUserDefault(
    email: string,
    password: string,
    profileData?: Profile,
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const profileUser = new Profile();
        profileUser.firstName = profileData.firstName
          ? profileData.firstName
          : undefined;
        profileUser.lastName = profileData.lastName
          ? profileData.lastName
          : undefined;
        profileUser.dateOfBirthday = profileData.dateOfBirthday
          ? profileData.dateOfBirthday
          : undefined;
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.profile = profileUser;
        const result = await this.userRepository.save(newUser);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  findOneUser(id: number): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['profile'] });
  }

  findAllActiveUsers(): Promise<User[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }
}
