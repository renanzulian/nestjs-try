import {
  IsEmail,
  Length,
  IsNumber,
  IsInt,
  IsNumberString,
} from 'class-validator';
import { User } from '../models/user.entity';
export class CreateUser {
  @IsEmail()
  readonly email: string;

  @Length(6)
  readonly password: string;
}

export class FindOneUser {
  @IsNumberString()
  userId: number;
}

export class ManyUsersResponse {
  users: User[];
}
