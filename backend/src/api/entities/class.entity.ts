/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SmsSchool } from './school.entity';

@Entity()
@ObjectType()
export class SmsSchoolClass {
  @PrimaryGeneratedColumn()
  @Field()
  classId: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => SmsSchool, (schoolClass) => schoolClass.classes)
  school: SmsSchool;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;
}
