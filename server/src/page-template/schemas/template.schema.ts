import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type PageTemplateDocument = PageTemplate & Document

@Schema()
export class PageTemplate {
    @Prop({ required: true, unique: true })
    pageName: string

    @Prop()
    banner: string
}

export const templateSchema = SchemaFactory.createForClass(PageTemplate)