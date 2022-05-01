import { LandType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type  LandDocument = Land & Document;

class LandAddress extends Address {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    project?: string
}

class LandPosition extends Position {
    @Prop()
    blockName?: string
}

class LandAcreage extends Acreage {
    @Prop()
    height?: number

    @Prop()
    width?: number
}

class LandDetail extends Detail {
    @Prop({ type: LandPosition })
    position: LandPosition

    @Prop({ type: LandAddress })
    address: LandAddress

    @Prop({ type: LandAcreage })
    acreage: LandAcreage
}

class LandOverview extends Overview {
    @Prop({ type: LandType })
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