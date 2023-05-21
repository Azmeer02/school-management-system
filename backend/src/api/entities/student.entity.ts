/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SmsClassStudent {
  @PrimaryGeneratedColumn()
  @Field()
  studentId: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  rollNumber: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field({ nullable: true})
  phoneNumber: number;
  
  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;
}
