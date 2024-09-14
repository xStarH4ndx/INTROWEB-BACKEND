import { Module } from '@nestjs/common';
import { UserMachineService } from './user-machine.service';
import { UserMachineController } from './user-machine.controller';

import { UserMachine, UserMachineSchema } from 'src/schemas/user-machine.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserMachine.name, schema: UserMachineSchema }]),
  ],
  controllers: [UserMachineController],
  providers: [UserMachineService],
})
export class UserMachineModule {}
