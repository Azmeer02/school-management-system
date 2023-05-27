/* eslint-disable prettier/prettier */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
// import { SmsSchool } from '../entities/school.entity';
import { CreateClassInput, UpdateClassInput } from '../model';
import { SmsSchoolClass } from '../entities/class.entity';
import { ClassService } from '../services/class.service';
import { SmsSchool } from '../entities/school.entity';

@Resolver(() => SmsSchoolClass)
export class ClassResolver {
  constructor(private classService: ClassService) {}

  @Query(() => [SmsSchoolClass])
  async getAllClasses(): Promise<SmsSchoolClass[]> {
    return await this.classService.getAllClasses();
  }

  @Query(() => SmsSchoolClass)
  async getClassById(@Args('id') id: number): Promise<SmsSchoolClass> {
    return await this.classService.getClassById(id);
  }

  @Mutation(() => SmsSchoolClass)
  async createClass(
    @Args('input') data: CreateClassInput,
  ): Promise<SmsSchoolClass> {
    return await this.classService.createClass(data);
  }

  @Mutation(() => SmsSchoolClass)
  async updateClass(
    @Args('id') id: number,
    @Args('input') data: UpdateClassInput,
  ): Promise<SmsSchoolClass> {
    return await this.classService.updateClass(id, data);
  }

  @Mutation(() => Boolean)
  async deleteClass(@Args('id') id: number): Promise<boolean> {
    await this.classService.deleteClass(id);
    return true;
  }

  @ResolveField(() => SmsSchool)
  async school(@Parent() smsClass: SmsSchoolClass): Promise<SmsSchool> {
    return smsClass.school;
  }
}
