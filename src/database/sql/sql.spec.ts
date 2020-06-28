import { Sql } from './sql';

describe('Sql', () => {
  it('should be defined', () => {
    expect(new Sql()).toBeDefined();
  });

  it('should return a sqlite connection', () => {
    const connectionOptions = Sql.getConnection();
    expect(connectionOptions).toHaveProperty('database');
    expect(connectionOptions.type).toBe('sqlite');
  });

  it('should return a postgres connection', () => {
    process.env.NODE_ENV = 'dev';
    const connectionOptions = Sql.getConnection();
    expect(connectionOptions).toHaveProperty('url');
    expect(connectionOptions.type).toBe('postgres');
  });
});
