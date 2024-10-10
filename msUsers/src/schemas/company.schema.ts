import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop({ type: String, required: true, unique: true })
  name?: string;

  @Prop({ type: String, required: true })
  address?: string;

  // Relación con Area (una compañía tiene muchas áreas)
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'area' }] })
  areas?: MongooseSchema.Types.ObjectId[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
