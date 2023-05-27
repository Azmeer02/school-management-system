/* eslint-disable prettier/prettier */
import { Field, InputType, ObjectType } from '@nestjs/graphql';

export enum UserType {
  STUDENT = 'STUDENT',
  SCHOOL = 'SCHOOL',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}
@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  phoneNumber: string;
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

  @Field({ nullable: true })
  schoolName: string;

  @Field({ nullable: true })
  schoolAddress: string;
}
@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
@InputType()
export class CreateSchoolInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;
}
@InputType()
export class UpdateSchoolInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  email: string;
}
@InputType()
export class CreateClassInput {
  @Field()
  name: string;

  @Field()
  schoolId: number;
}
@InputType()
export class UpdateClassInput {
  @Field()
  name: string;
}
@ObjectType()
export class LoginOutput {
  @Field({ nullable: false })
  access_token: string;
}

@ObjectType('status')
export class OperationStatus {
  @Field({ nullable: false })
  status: string;

  @Field({ nullable: false })
  msg: string;
}
