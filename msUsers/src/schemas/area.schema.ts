import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Area extends Document {
    @Prop({ type: String, required: true })
    name?: string;

    @Prop({ type: String, required: true })
    address?: string;

    // Relación con Company (un área pertenece a una compañía)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company', required: true })
    company?: MongooseSchema.Types.ObjectId;

    // Relación con User (un area tiene muchos usuarios)
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'user' }] })
    users?: MongooseSchema.Types.ObjectId[];

    // Relación con Machine (un area tiene muchas maquinas)
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'machine' }] })
    machines?: MongooseSchema.Types.ObjectId[];
}

export const AreaSchema = SchemaFactory.createForClass(Area);
