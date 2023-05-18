import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Entities go here
    ]),
  ],
  providers: [
    // Services & Resolvers go here
  ],
})
export class ApiModule {}
