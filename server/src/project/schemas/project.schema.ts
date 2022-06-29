import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Address } from "src/real-estate/schemas/parent-classes/general.schema"
import { ProjectType } from "../enum/pj.enum"
import { Document } from 'mongoose'

class ProjectUtilities {
    @Prop()
    image: string

    @Prop()
    title: string
}

class ProjectInformation {
    @Prop()
    purchaseInfo: number

    @Prop()
    rentInfo: number

    @Prop()
    startedAt?: string

    @Prop()
    handOverYear?: number

    @Prop(ProjectType)
    type: ProjectType

    @Prop()
    acreage?: number

    @Prop(type => String)
    scale?: string

    @Prop(type => String)
    progressStatus?: string

    @Prop(type => String)
    status?: string
}

class ProjectMedia {
    @Prop(type => [String])
    images: string[]
}

class ProjectInvestor {
    @Prop()
    name: string

    @Prop()
    establishYear: number

    @Prop()
    about: string
}


class MasterPlan {
    @Prop()
    image: string
    
    @Prop()
    title: string
}

@Schema()
export class Project {
    @Prop(ProjectMedia)
    media: ProjectMedia

    @Prop(String)
    projectName: string

    @Prop(Address)
    address: Address

    @Prop(ProjectInformation)
    information: ProjectInformation

    @Prop([ProjectUtilities])
    utilities: ProjectUtilities[]

    @Prop(String)
    description: string

    @Prop(ProjectInvestor)
    investor: ProjectInvestor

    @Prop([MasterPlan])
    masterPlan: MasterPlan[]

    @Prop()
    timeStamp: Date

    @Prop()
    directLink: string

    @Prop()
    virtual3DLink?: string

    @Prop()
    googleMapsLink?: string

    @Prop({ default: true })
    actived: boolean

    @Prop({ default: false })
    outstanding: boolean

    @Prop({ index: true })
    index: number
}

export type ProjectDocument = Project & Document

export const projectSchema = SchemaFactory.createForClass(Project)