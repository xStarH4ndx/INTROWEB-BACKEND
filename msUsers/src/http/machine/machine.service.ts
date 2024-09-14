import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
//mongo
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Machine } from 'src/schemas/machine.schema';
import { mongoErrorHandler } from 'src/utils/mongo-error-handler';
import { MongoError } from 'mongodb';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine.name) private machineModel: Model<Machine>) {}

  async create(createMachineDto: CreateMachineDto) {
    try {
      return await this.machineModel.create(createMachineDto);
    } catch (error) {
      if((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.machineModel.find().exec();
  }

  async findOne(id: string) {
    return await this.machineModel.findById(id).exec();
  }

  async update(id:string, UpdateMachineDto: UpdateMachineDto) {
    try {
      return await this.machineModel.updateOne({ _id: id }, UpdateMachineDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id:string){
    return await this.machineModel.deleteOne({ _id: id });
  }
}
