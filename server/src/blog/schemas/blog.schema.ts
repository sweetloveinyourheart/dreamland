import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

@Schema()
export class Blog {
    @Prop()
    content: string

    @Prop()
    image: string

    @Prop()
    link: string

    @Prop()
    timeStamp: Date

    @Prop()
    title: string
}

export type BlogDocument = Blog & Document

export const blogSchema = SchemaFactory.createForClass(Blog)