import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../models/profile.entity';
import { CreateUser } from '../utils/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  userFactory(email: string, password: string, profile?: Profile): User {
    const user = new User();
    user.email = email;
    user.password = password;
    user.profile = profile ? profile : null;
    return user;
  }

  profileFactory(
    firstName?: string,
    lastName?: string,
    dateOfBirthday?: Date,
  ): Profile {
    const profile = new Profile();
    profile.firstName = firstName ? firstName : null;
    profile.lastName = lastName ? lastName : null;
    profile.dateOfBirthday = dateOfBirthday ? dateOfBirthday : null;
    return profile;
  }

  createUser(payload: CreateUser): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const newProfile = this.profileFactory(
          payload.firstName,
          payload.lastName,
          payload.dateOfBirthday,
        );
        const newUser = this.userFactory(
          payload.email,
          payload.password,
          newProfile,
        );
        const result = await this.userRepository.save(newUser);
        await this.profileRepository.save(newProfile);
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
