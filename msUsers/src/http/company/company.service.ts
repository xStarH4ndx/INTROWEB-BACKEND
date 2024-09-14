import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { Company } from 'src/schemas/company.schema';
import { mongoErrorHandler } from 'src/utils/mongo-error-handler';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyModel.create(createCompanyDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.companyModel.find().exec();
  }

  async findOne(id: string) {
    return await this.companyModel.findById(id).exec();
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.companyModel.updateOne({ _id: id }, updateCompanyDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.companyModel.deleteOne({ _id: id });
  }
}
