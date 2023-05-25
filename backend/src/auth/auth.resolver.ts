/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, LoginOutput, UserSignUpInput } from 'src/api/model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async signup(
    @Args('signupInput') signUpInput: UserSignUpInput,
  ): Promise<string> {
    const token = await this.authService.signup(signUpInput);

    return token;
  }

  @Mutation(() => String)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginOutput> {
    const token = await this.authService.login(
      loginInput?.email,
      loginInput?.password,
    );

    return token;
  }
}
