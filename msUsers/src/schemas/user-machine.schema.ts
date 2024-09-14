import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserMachine extends Document{
    @Prop({type: String, required: true})
    name?: string;

    @Prop({type: String, required: true})
    address?: string;

}

export const UserMachineSchema = SchemaFactory.createForClass(UserMachine)
