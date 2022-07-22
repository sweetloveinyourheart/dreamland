import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DeviceOS, Sex, UserRole } from "../enum/user.enum";
import { Document } from "mongoose"

export type UserDocument = Document & User

@Schema({ _id: false })
export class Device {
    @Prop({ enum: DeviceOS })
    OS: DeviceOS

    @Prop()
    expoPushToken: string
}

@Schema()
export class User {
    @Prop({ unique: true })
    phone: string

    @Prop({ required: true })
    password: string

    @Prop()
    email?: string

    @Prop({ required: true })
    name: string

    @Prop()
    avatar?: string

    @Prop()
    birthday?: Date

    @Prop({ enum: Sex })
    sex?: Sex

    @Prop()
    address?: string

    @Prop()
    createdAt: Date

    @Prop({ default: [UserRole.User] })
    roles: UserRole[]

    @Prop({ default: true })
    actived: boolean

    @Prop()
    device?: Device
}

export const userSchema = SchemaFactory.createForClass(User)