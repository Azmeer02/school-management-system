/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SmsUser } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserUpdateInput } from '../model';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [SmsUser])
  async getAllUsers(): Promise<SmsUser[]> {
    return await this.userService.getUsers();
  }

  @Query(() => SmsUser)
  async getUserById(@Args('id') id: number): Promise<SmsUser> {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => SmsUser)
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UserUpdateInput,
  ): Promise<SmsUser> {
    return await this.userService.updateUser(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    await this.userService.deleteUser(id);

    return true;
  }
}
