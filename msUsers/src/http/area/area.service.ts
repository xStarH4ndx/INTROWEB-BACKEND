import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from 'src/schemas/area.schema';
import { mongoErrorHandler } from 'src/utils/mongo-error-handler';
import { MongoError } from 'mongodb';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) {}

  async create(createAreaDto: CreateAreaDto) {
    try {
      return await this.areaModel.create(createAreaDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.areaModel.find().exec();
  }

  async findOne(id: string) {
    return await this.areaModel.findById(id).exec();
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    try {
      return await this.areaModel.updateOne({ _id: id }, updateAreaDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.areaModel.deleteOne({ _id: id });
  }
}
