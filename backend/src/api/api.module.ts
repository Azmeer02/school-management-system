/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FooResolver } from './resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmsUser])],
  providers: [FooResolver],
})
export class ApiModule {}
