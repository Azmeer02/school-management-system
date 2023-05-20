/* eslint-disable prettier/prettier */
import { Field, ObjectType, HideField } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { UserType } from '../model';

@Entity()
@ObjectType()
export class SmsUser {
  @Column({ unique: true, primary: true, generated: true })
  @Field()
  id: number;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @HideField()
  password: string;

  @Column()
  @Field()
  userType: UserType;
}
