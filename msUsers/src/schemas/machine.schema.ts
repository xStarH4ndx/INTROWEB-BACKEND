import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Machine extends Document{
    @Prop({type: String, required: true})
    name?: string;

    @Prop({type: String, required: true})
    address?: string;

}

export const MachineSchema = SchemaFactory.createForClass(Machine);
