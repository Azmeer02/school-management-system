/* eslint-disable prettier/prettier */
import { Field, ObjectType, HideField } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updatedAt: Date;
}
