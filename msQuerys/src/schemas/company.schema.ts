import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop({ type: String, required: true, unique: true })
  name?: string;

  @Prop({ type: String, required: true })
  address?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
