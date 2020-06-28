import * as DTO from './users.dto';

describe('UsersDto', () => {
  it('should be defined', () => {
    expect(new DTO.CreateUser()).toBeDefined();
  });
});
