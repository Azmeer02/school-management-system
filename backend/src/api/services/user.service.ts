/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsUser } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { OperationStatus, UserUpdateInput } from '../model';

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

  async updateUser(id: number, input: UserUpdateInput): Promise<SmsUser> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    user.firstname = input.firstname ? input.firstname : user.firstname;
    user.lastname = input.lastname ? input.lastname : user.lastname;
    user.email = input.email ? input.email : user.email;
    user.phoneNumber = input.phoneNumber ? input.phoneNumber : user.phoneNumber;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<OperationStatus> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    const res = await this.userRepository.delete(id);

    if (res['affected'] > 0)
      return {
        status: 'ok',
        msg: `${res['affected']} records deleted`,
      } as OperationStatus;
    else
      return { status: 'fail', msg: 'No records deleted' } as OperationStatus;
  }
}
