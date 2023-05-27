/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SmsSchool } from './school.entity';
import { SmsClassStudent } from './student.entity';

@Entity()
@ObjectType()
export class SmsSchoolClass {
  @PrimaryGeneratedColumn()
  @Field()
  classId: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => SmsSchool, (school) => school.classes)
  @JoinColumn({ name: 'schoolId' })
  school: SmsSchool;

  @OneToMany(() => SmsClassStudent, (classStudent) => classStudent.class)
  students: SmsClassStudent[];

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
