import { Injectable } from '@nestjs/common';
import { CreateUserMachineDto } from './dto/create-user-machine.dto';
import { UpdateUserMachineDto } from './dto/update-user-machine.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserMachine } from 'src/schemas/user-machine.schema';
import { mongoErrorHandler } from 'src/utils/mongo-error-handler';
import { MongoError } from 'mongodb';

@Injectable()
export class UserMachineService {
  constructor(@InjectModel(UserMachine.name) private userMachineModel: Model<UserMachine>) {}

  async create(createUserMachineDto: CreateUserMachineDto) {
    try {
      return await this.userMachineModel.create(createUserMachineDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.userMachineModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userMachineModel.findById(id).exec();
  }

  async update(id: string, updateUserMachineDto: UpdateUserMachineDto) {
    try {
      return await this.userMachineModel.updateOne({ _id: id }, updateUserMachineDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.userMachineModel.deleteOne({ _id: id });
  }
}
