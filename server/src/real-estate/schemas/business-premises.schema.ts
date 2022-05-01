import { BusinessPremisesType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type  BusinessPremisesDocument = BusinessPremises & Document;

class BusinessPremisesAddress extends Address {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    project?: string
}

class BusinessPremisesPosition extends Position {
    @Prop()
    blockName?: string

    @Prop()
    floorNumber?: number
}

export class BusinessPremisesDetail extends Detail {
    @Prop({ type: BusinessPremisesPosition })
    position: BusinessPremisesPosition

    @Prop({ type: BusinessPremisesAddress })
    address: BusinessPremisesAddress

    @Prop({ type: Acreage })
    acreage: Acreage
}

class BusinessPremisesOverview extends Overview {
    @Prop({ type: BusinessPremisesType })
    type: BusinessPremisesType

    @Prop({ type: Furniture })
    furniture?: Furniture
}

@Schema()
export class BusinessPremises extends RealEstate {
    @Prop()
    category: RealEstateCategory

    @Prop({ type: BusinessPremisesDetail })
    detail: BusinessPremisesDetail

    @Prop({ type: BusinessPremisesOverview })
    overview: BusinessPremisesOverview

    @Prop({ index: true })
    businessPremisesID: number
}

export const BusinessPremisesSchema = SchemaFactory.createForClass(BusinessPremises)