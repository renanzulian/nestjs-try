import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUser } from '../utils/users.dto';
import { Users } from '../models/users.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  index(): string {
    return 'A lot of users';
  }

  @Get(':userId')
  view(@Param('userId') userId: number): string {
    return `The user ${userId}`;
  }

  @Post()
  store(@Body() user: CreateUser): Promise<Users> {
    const { email, password } = user;
    return this.usersService
      .createUserDefault(email, password)
      .then(result => result)
      .catch(error => {
        throw new InternalServerErrorException(error.message);
      });
  }
}
