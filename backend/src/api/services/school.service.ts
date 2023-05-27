/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsSchool } from '../entities/school.entity';
import {
  CreateSchoolInput,
  OperationStatus,
  UpdateSchoolInput,
} from '../model';
import { SmsSchoolClass } from '../entities/class.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SmsSchool)
    private schoolRepository: Repository<SmsSchool>,
    @InjectRepository(SmsSchoolClass)
    private classRepository: Repository<SmsSchoolClass>,
  ) {}

  async getAllSchools(): Promise<SmsSchool[]> {
    return await this.schoolRepository.find();
  }

  async getSchoolById(id: number): Promise<SmsSchool> {
    const school = await this.schoolRepository.findOne({
      where: { schoolId: id },
    });

    if (!school) {
      throw new Error('School not found');
    }

    return school;
  }

  async createSchool(schoolData: CreateSchoolInput): Promise<SmsSchool> {
    const existingSchool = await this.schoolRepository.findOne({
      where: { email: schoolData.email },
    });

    if (existingSchool) {
      throw new Error('Email already exists');
    }

    const school = new SmsSchool();

    school.name = schoolData.name;
    school.email = schoolData.email;
    school.contactNumber = schoolData.phoneNumber;
    school.address = schoolData.address;

    return await this.schoolRepository.save(school);
  }

  async updateSchool(
    id: number,
    updateSchoolInput: UpdateSchoolInput,
  ): Promise<SmsSchool> {
    const school = await this.schoolRepository.findOne({
      where: { schoolId: id },
    });

    if (!school) {
      throw new Error('School not found');
    }

    school.name = updateSchoolInput.name ? updateSchoolInput.name : school.name;
    school.email = updateSchoolInput.email
      ? updateSchoolInput.email
      : school.email;
    school.contactNumber = updateSchoolInput.phoneNumber
      ? updateSchoolInput.phoneNumber
      : school.contactNumber;
    school.address = updateSchoolInput.address
      ? updateSchoolInput.address
      : school.address;

    return await this.schoolRepository.save(school);
  }

  async deleteSchool(id: number): Promise<OperationStatus> {
    const school = await this.schoolRepository.findOne({
      where: { schoolId: id },
    });

    if (!school) {
      throw new Error('School not found');
    }

    const res = await this.schoolRepository.delete(id);

    if (res.affected > 0) {
      return {
        status: 'ok',
        msg: `${res.affected} records deleted`,
      };
    } else {
      return {
        status: 'fail',
        msg: 'No records deleted',
      };
    }
  }

  async getClassesBySchoolId(schoolId: number): Promise<SmsSchoolClass[]> {
    return await this.classRepository
      .createQueryBuilder('class')
      .where('class.school.schoolId = :schoolId', { schoolId })
      .getMany();
  }
}
