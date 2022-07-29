import { BusinessPremisesType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./parent-classes/general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from "src/project/schemas/project.schema";

export type BusinessPremisesDocument = BusinessPremises & Document;

@Schema({ _id: false, id: false })
class BusinessPremisesPosition extends Position {
    @Prop()
    blockName?: string

    @Prop()
    floorNumber?: number
}

@Schema({ _id: false, id: false })
export class BusinessPremisesDetail extends Detail {
    @Prop({ type: BusinessPremisesPosition })
    position: BusinessPremisesPosition

    @Prop({ type: Address })
    address: Address

    @Prop({ type: Acreage })
    acreage: Acreage


}

@Schema({ _id: false, id: false })
class BusinessPremisesOverview extends Overview {
    @Prop({ enum: BusinessPremisesType })
    type: BusinessPremisesType

    @Prop({ enum: Furniture })
    furniture?: Furniture
}

@Schema()
export class BusinessPremises extends RealEstate {
    @Prop({ enum: RealEstateCategory })
    category: RealEstateCategory

    @Prop({ type: BusinessPremisesDetail })
    detail: BusinessPremisesDetail

    @Prop({ type: BusinessPremisesOverview })
    overview: BusinessPremisesOverview
}

export const BusinessPremisesSchema = SchemaFactory.createForClass(BusinessPremises)