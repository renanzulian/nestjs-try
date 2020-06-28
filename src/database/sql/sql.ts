import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../../components/users/models/users.entity';

export class Sql {
  static getConnection(): TypeOrmModuleOptions {
    switch (process.env.NODE_ENV) {
      case 'test':
        return {
          type: 'sqlite',
          database: 'test/sqlite.db',
          synchronize: true,
          autoLoadEntities: true,
          entities: [Users],
        };
        break;
      default:
        return {
          type: 'postgres',
          url:
            process.env.SQL_URL ||
            'postgres://postgres:psql@localhost/postgres',
          synchronize: true,
          autoLoadEntities: true,
          entities: [Users],
        };
        break;
    }
  }
}
