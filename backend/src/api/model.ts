/* eslint-disable prettier/prettier */
import { Field, InputType, ObjectType } from '@nestjs/graphql';

export enum UserType {
  STUDENT = 'STUDENT',
  SCHOOL = 'SCHOOL',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

@InputType()
export class UserSignUpInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field()
  userType: UserType;
}
@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field({ nullable: false })
  access_token: string;
}
