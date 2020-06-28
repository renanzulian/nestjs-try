import { Users } from './users.entity';

describe('UsersEntity', () => {
  it('should be defined', () => {
    expect(new Users()).toBeDefined();
  });
});
