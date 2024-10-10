import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { mongoErrorHandler } from 'src/utils/mongo-error-handler';
import { MongoError } from 'mongodb';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private readonly httpService:HttpService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.updateOne({ _id: id }, updateUserDto);
    } catch (error: unknown) {
      if ((error as Record<string, number>)?.code)
        mongoErrorHandler(error as MongoError);
      throw new Error(error as string);
    }
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }


  async checkToken(token:string)
  {
    console.log("Hola")
    const url = 'http://localhost:3001/auth/profile';

    try{
      const response = await axios.get(url,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      console.log(response.data)

      return {
        message:"Permiso concedido",
        userProfile:response.data};
    }catch(error)
    {
      throw new UnauthorizedException("No autorized token");
    }
  }
  async refresh(refreshToken:string)
  {
    const url = 'http://localhost:3001/auth/refresh';
    
    // Hacemos la solicitud POST
    try {
      const response = await axios.post(url, { refresh_token: refreshToken });
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Could not refresh access token'); // Manejo de errores según sea necesario
    }

  }
  
}
