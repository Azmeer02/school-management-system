/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SmsSchoolClass } from './class.entity';

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
  @Field({ nullable: true })
  phoneNumber: number;

  @Column()
  @Field()
  address: string;

  @ManyToOne(() => SmsSchoolClass, (classStudent) => classStudent.students)
  class: SmsSchoolClass;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  logCreatedAt: Date;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  logUpdatedAt: Date;
}
