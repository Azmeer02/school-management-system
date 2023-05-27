/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args, ResolveField, Root } from '@nestjs/graphql';
import { LoginInput, LoginOutput, UserSignUpInput } from 'src/api/model';
import { AuthService } from './auth.service';
import { SmsSchool } from 'src/api/entities/school.entity';
import { SmsUser } from 'src/api/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(SmsUser)
export class AuthResolver {
  constructor(
    @InjectRepository(SmsSchool)
    private schoolRepository: Repository<SmsSchool>,
    private authService: AuthService,
  ) {}

  @Mutation(() => String)
  async signup(
    @Args('signupInput') signUpInput: UserSignUpInput,
  ): Promise<string> {
    const token = await this.authService.signup(signUpInput);

    return token;
  }

  @Mutation(() => LoginOutput)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginOutput> {
    const token = await this.authService.login(
      loginInput?.email,
      loginInput?.password,
    );

    return token;
  }

  @ResolveField(() => SmsSchool, { nullable: true })
  async school(@Root() user: SmsUser): Promise<SmsSchool | null> {
    const schoolId = user.schoolId;

    if (!schoolId) {
      return null;
    }

    const school = await this.schoolRepository.findOne({ where: { schoolId } });

    return school;
  }
}
