import { Furniture, RealEstateCategory } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview,  RealEstate } from "./parent-classes/general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type  MotalDocument = Motal & Document;

@Schema({ _id: false, id: false })
class MotalDetail extends Detail {
    @Prop({ type: Address })
    address: Address

    @Prop({ type: Acreage })
    acreage: Acreage
}

@Schema({ _id: false, id: false })
class MotalOverview extends Overview {
    @Prop({ enum: Furniture })
    furniture?: Furniture

    @Prop()
    numberOfFloors?: number
}

@Schema()
export class Motal extends RealEstate {
    @Prop()
    category: RealEstateCategory.ChoThue

    @Prop({ type: MotalDetail })
    detail: MotalDetail

    @Prop({ type: MotalOverview })
    overview: MotalOverview
}

export const MotalSchema = SchemaFactory.createForClass(Motal)