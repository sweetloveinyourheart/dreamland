import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type PageTemplateDocument = PageTemplate & Document

@Schema()
class Banner {
    @Prop()
    imgUrl: string

    @Prop()
    directLink: string
}

@Schema()
export class PageTemplate {
    @Prop({ required: true, unique: true })
    pageName: string

    @Prop()
    banner: Banner
}

export const templateSchema = SchemaFactory.createForClass(PageTemplate)