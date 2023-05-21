/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SmsSchoolClass } from './class.entity';

@Entity()
@ObjectType()
export class SmsSchool {
  @PrimaryGeneratedColumn()
  @Field()
  schoolId: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  contactNumber: number;

  @OneToMany(() => SmsSchoolClass, (schoolClass) => schoolClass.school)
  classes: SmsSchoolClass[];

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  updatedAt: Date;
}
