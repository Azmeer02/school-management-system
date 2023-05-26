/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsUser } from './entities/user.entity';
import { SmsSchool } from './entities/school.entity';
import { SmsSchoolClass } from './entities/class.entity';
import { SmsClassStudent } from './entities/student.entity';
import { UserService } from './services/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolService } from './services/school.service';
import { SchoolResolver } from './resolvers/school.resolver';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      SmsUser,
      SmsSchool,
      SmsSchoolClass,
      SmsClassStudent,
    ]),
  ],
  providers: [UserResolver, UserService, SchoolService, SchoolResolver],
})
export class ApiModule {}
