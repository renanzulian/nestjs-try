import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { Profile } from '../models/profile.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userMock: MockType<Repository<User>>;
  let profileMock: MockType<Repository<Profile>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Profile),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userMock = module.get(getRepositoryToken(User));
    profileMock = module.get(getRepositoryToken(Profile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    createUserDefault: jest.fn(entity => entity),
  }),
);
export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: jest.Mock<{}>;
};
