/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsUser } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SmsUser)
    private userRepository: Repository<SmsUser>,
  ) {}

  async getUsers(): Promise<SmsUser[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<SmsUser> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    return user;
  }

  async updateUser(id: number, updatedUser: SmsUser): Promise<SmsUser> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.firstname = updatedUser.firstname;
    user.lastname = updatedUser.lastname;
    user.email = updatedUser.email;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(user);
  }
}
