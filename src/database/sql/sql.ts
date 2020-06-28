import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../components/users/models/user.entity';

export class Sql {
  static getConnection(): TypeOrmModuleOptions {
    switch (process.env.NODE_ENV) {
      case 'test':
        return {
          type: 'sqlite',
          database: 'test/sqlite.db',
          synchronize: true,
          autoLoadEntities: true,
          entities: [User],
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
          entities: [User],
        };
        break;
    }
  }
}
