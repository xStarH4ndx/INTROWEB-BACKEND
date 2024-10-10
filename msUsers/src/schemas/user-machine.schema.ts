import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class UserMachine extends Document {
    
    // Relación con User (muchos usuarios pueden manejar una máquina)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user', required: true })
    user?: MongooseSchema.Types.ObjectId;

    // Relación con Machine (una máquina puede ser manejada por muchos usuarios)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'machine', required: true })
    machine?: MongooseSchema.Types.ObjectId;
}

export const UserMachineSchema = SchemaFactory.createForClass(UserMachine);
