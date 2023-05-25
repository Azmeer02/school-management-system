/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsUser } from 'src/api/entities/user.entity';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { ApiModule } from 'src/api/api.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

dotenv.config();

@Module({
  imports: [
    forwardRef(() => ApiModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([SmsUser]),
  ],
  exports: [JwtModule],
  providers: [AuthResolver, AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
