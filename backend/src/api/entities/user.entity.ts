/* eslint-disable prettier/prettier */
import { Field, ObjectType, HideField } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../model';

@Entity()
@ObjectType()
export class SmsUser {
  @PrimaryGeneratedColumn()
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

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;
}
