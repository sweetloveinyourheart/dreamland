import { LandType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from "src/project/schemas/project.schema";

export type  LandDocument = Land & Document;

@Schema({ _id: false, id: false })
class LandPosition extends Position {
    @Prop()
    blockName?: string
}

@Schema({ _id: false, id: false })
class LandAcreage extends Acreage {
    @Prop()
    height?: number

    @Prop()
    width?: number
}

@Schema({ _id: false, id: false })
class LandDetail extends Detail {
    @Prop({ type: LandPosition })
    position: LandPosition

    @Prop({ type: Address })
    address: Address

    @Prop({ type: LandAcreage })
    acreage: LandAcreage
}

@Schema({ _id: false, id: false })
class LandOverview extends Overview {
    @Prop({ enum: LandType })
    type: LandType

    @Prop()
    carAlley?: boolean

    @Prop()
    noHau?: boolean

    @Prop()
    frontispiece?: boolean
}

@Schema()
export class Land extends RealEstate {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Project", autopopulate: true })
    project?: Project
    
    @Prop()
    category: RealEstateCategory

    @Prop({ type: LandDetail })
    detail: LandDetail

    @Prop({ type: LandOverview })
    overview: LandOverview

    @Prop({ index: true })
    landID: number
}

export const LandSchema = SchemaFactory.createForClass(Land)