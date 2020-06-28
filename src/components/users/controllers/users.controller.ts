import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateUser, FindOneUser, ManyUsersResponse } from '../utils/users.dto';
import { User } from '../models/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async index(): Promise<ManyUsersResponse> {
    return this.usersService
      .findAllActiveUsers()
      .then(results => {
        return {
          users: results,
        };
      })
      .catch(error => {
        throw new InternalServerErrorException(error.message);
      });
  }

  @Get(':userId')
  async view(@Param() params: FindOneUser): Promise<void | User> {
    const { userId } = params;
    return this.usersService
      .findOneUser(userId)
      .then(result => {
        return { ...result };
      })
      .catch(error => {
        throw new InternalServerErrorException(error.message);
      });
  }

  @Post()
  async store(@Body() user: CreateUser): Promise<User> {
    const { email, password, ...profile } = user;
    return this.usersService
      .createUserDefault(email, password, profile)
      .then(result => result)
      .catch(error => {
        console.log(error);
        if (error.code == '23505') {
          throw new ConflictException(error.detail);
        } else {
          throw new InternalServerErrorException();
        }
      });
  }
}
