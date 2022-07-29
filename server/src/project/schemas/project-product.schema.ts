import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose'
import { ProjectProductStatus } from "../enum/pj.enum";
import { Project } from "./project.schema";

export type ProjectProductDocument = Document & ProjectProduct

@Schema()
export class ProjectProduct {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project' })
    project: Project

    @Prop()
    code: string

    @Prop()
    totalAcreage: number

    @Prop()
    quantity: number

    @Prop()
    price: number

    @Prop()
    usedAcreage: number

    @Prop()
    description: string

    @Prop({ enum: ProjectProductStatus, default: ProjectProductStatus.Available })
    status: ProjectProductStatus

    @Prop()
    timeStamp: Date
}

export const projectProductSchema = SchemaFactory.createForClass(ProjectProduct)