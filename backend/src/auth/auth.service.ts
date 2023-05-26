/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { SmsUser } from 'src/api/entities/user.entity';
import { LoginOutput, UserSignUpInput } from 'src/api/model';
import { InjectRepository } from '@nestjs/typeorm';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SmsUser)
    private userRepository: Repository<SmsUser>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginOutput> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload = { user: user };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async signup(userInput: UserSignUpInput): Promise<string> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userInput.email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = new SmsUser();

    user.email = userInput.email;
    user.password = await this.hashPassword(userInput.password);
    user.firstname = userInput.firstname;
    user.lastname = userInput.lastname;
    user.phoneNumber = userInput.phoneNumber ? userInput.phoneNumber : null;
    user.userType = userInput.userType;

    const createdUser = await this.userRepository.save(user);

    const payload = { userId: createdUser.id };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
