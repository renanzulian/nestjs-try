import {
  IsEmail,
  Length,
  IsNumber,
  IsInt,
  IsNumberString,
  IsString,
  IsDefined,
  IsDateString,
} from 'class-validator';
import { User } from '../models/user.entity';
export class CreateUser {
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @Length(6)
  readonly password: string;

  @Length(1, 25)
  readonly firstName: string;

  @Length(1, 25)
  readonly lastName: string;

  @IsDateString()
  readonly dateOfBirthday: Date;
}

export class FindOneUser {
  @IsNumberString()
  userId: number;
}

export class ManyUsersResponse {
  users: User[];
}
