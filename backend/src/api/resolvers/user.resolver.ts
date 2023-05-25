/* eslint-disable prettier/prettier */
import { Query, Resolver } from '@nestjs/graphql';
import { SmsUser } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [SmsUser])
  async getAllUsers(): Promise<SmsUser[]> {
    return await this.userService.getUsers();
  }
}
