import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './http/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './http/company/company.module';
import { AreaModule } from './http/area/area.module';
import { MachineModule } from './http/machine/machine.module';
import { UserMachineModule } from './http/user-machine/user-machine.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://asignatura:asignatura@cluster0.qxdoa.mongodb.net/questiondb'),

    UserModule,

    CompanyModule,

    AreaModule,

    MachineModule,

    UserMachineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
