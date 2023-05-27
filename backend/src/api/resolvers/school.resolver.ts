/* eslint-disable prettier/prettier */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { SchoolService } from '../services/school.service';
import { SmsSchool } from '../entities/school.entity';
import { CreateSchoolInput, UpdateSchoolInput } from '../model';
import { SmsSchoolClass } from '../entities/class.entity';

@Resolver(() => SmsSchool)
export class SchoolResolver {
  constructor(private schoolService: SchoolService) {}

  @Query(() => [SmsSchool])
  async getAllSchools(): Promise<SmsSchool[]> {
    return await this.schoolService.getAllSchools();
  }

  @Query(() => SmsSchool)
  async getSchoolById(@Args('id') id: number): Promise<SmsSchool> {
    return await this.schoolService.getSchoolById(id);
  }

  @Mutation(() => SmsSchool)
  async createSchool(
    @Args('input') data: CreateSchoolInput,
  ): Promise<SmsSchool> {
    return await this.schoolService.createSchool(data);
  }

  @Mutation(() => SmsSchool)
  async updateSchool(
    @Args('id') id: number,
    @Args('input') data: UpdateSchoolInput,
  ): Promise<SmsSchool> {
    return await this.schoolService.updateSchool(id, data);
  }

  @Mutation(() => Boolean)
  async deleteSchool(@Args('id') id: number): Promise<boolean> {
    await this.schoolService.deleteSchool(id);
    return true;
  }

  @ResolveField(() => [SmsSchoolClass])
  async classes(@Parent() school: SmsSchool): Promise<SmsSchoolClass[]> {
    return this.schoolService.getClassesBySchoolId(school.schoolId);
  }
}
