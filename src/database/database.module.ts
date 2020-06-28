import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sql } from './sql/sql';

@Module({
  imports: [TypeOrmModule.forRoot(Sql.getConnection())],
})
export class DatabaseModule {}
