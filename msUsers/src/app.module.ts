import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './http/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CompanyModule } from './http/company/company.module';
import { MachineModule } from './http/machine/machine.module';
import { AreaModule } from './http/area/area.module';
import { UserMachineModule } from './http/user-machine/user-machine.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://asignatura:asignatura@cluster0.qxdoa.mongodb.net/back-ms-iam'),
    
    /*ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
    })*/
    
    UserModule,

    CompanyModule,

    MachineModule,

    AreaModule,

    UserMachineModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
