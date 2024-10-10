import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Machine extends Document {
    @Prop({ type: String, required: true })
    name?: string;

    @Prop({ type: String, required: true })
    address?: string;

    // Relación con Area (una máquina pertenece a un área)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'area', required: true })
    area?: MongooseSchema.Types.ObjectId;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
