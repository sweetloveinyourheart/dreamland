import { Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type  MotalDocument = Motal & Document;

class MotalDetail extends Detail {
    @Prop({ type: Address })
    address: Address

    @Prop({ type: Acreage })
    acreage: Acreage
}

class MotalOverview extends Overview {
    @Prop({ type: Furniture })
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

    @Prop({ index: true })
    motalID: number
}

export const MotalSchema = SchemaFactory.createForClass(Motal)