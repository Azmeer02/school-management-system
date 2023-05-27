/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsSchool } from '../entities/school.entity';
import { CreateClassInput, OperationStatus, UpdateClassInput } from '../model';
import { SmsSchoolClass } from '../entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(SmsSchool)
    private schoolRepository: Repository<SmsSchool>,
    @InjectRepository(SmsSchoolClass)
    private classRepository: Repository<SmsSchoolClass>,
  ) {}

  async getAllClasses(): Promise<SmsSchoolClass[]> {
    return await this.classRepository.find();
  }

  async getClassById(id: number): Promise<SmsSchoolClass> {
    const smsClass = await this.classRepository.findOne({
      where: { classId: id },
    });

    if (!smsClass) {
      throw new Error('Class not found');
    }

    return smsClass;
  }

  async createClass(classData: CreateClassInput): Promise<SmsSchoolClass> {
    const smsClass = new SmsSchoolClass();

    smsClass.name = classData.name;

    return await this.classRepository.save(smsClass);
  }

  async updateClass(
    id: number,
    updateClassInput: UpdateClassInput,
  ): Promise<SmsSchoolClass> {
    const smsClass = await this.classRepository.findOne({
      where: { classId: id },
    });

    if (!smsClass) {
      throw new Error('Class not found');
    }

    smsClass.name = updateClassInput.name
      ? updateClassInput.name
      : smsClass.name;

    return await this.classRepository.save(smsClass);
  }

  async deleteClass(id: number): Promise<OperationStatus> {
    const smsClass = await this.classRepository.findOne({
      where: { classId: id },
    });

    if (!smsClass) {
      throw new Error('Class not found');
    }

    const res = await this.classRepository.delete(id);

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

  async getSchoolById(schoolId: number): Promise<SmsSchool> {
    return await this.schoolRepository.findOne({ where: { schoolId } });
  }
}
