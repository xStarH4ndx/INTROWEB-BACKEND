import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';

import { Area, AreaSchema } from 'src/schemas/area.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
  ],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
