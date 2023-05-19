/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FooResolver } from './resolvers/app.resolver';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forFeature([
      // Entities go here
    // ]),
  ],
  providers: [
    FooResolver
  ],
})
export class ApiModule {}
