import { HouseType, Furniture, RealEstateCategory } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type  HouseDocument = House & Document;

class HouseAddress extends Address {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    project?: string
}

class HousePosition extends Position {
    @Prop()
    blockName?: string
}


class HouseAcreage extends Acreage {
    @Prop()
    usedAcreage?: number

    @Prop()
    height?: number

    @Prop()
    width?: number
}

class HouseDetail extends Detail {
    @Prop({ type: HousePosition })
    position: HousePosition

    @Prop({ type: HouseAddress })
    address: HouseAddress

    @Prop({ type: HouseAcreage })
    acreage: HouseAcreage
}

class HouseOverview extends Overview {
    @Prop({ type: HouseType })
    type: HouseType

    @Prop()
    numberOfFloors?: number

    @Prop()
    carAlley?: boolean

    @Prop()
    noHau?: boolean

    @Prop()
    frontispiece?: boolean

    @Prop()
    numberOfBedrooms: number

    @Prop()
    numberOfBathrooms?: number

    @Prop({ type: Furniture })
    furniture?: Furniture
}

@Schema()
export class House extends RealEstate {
    @Prop()
    category: RealEstateCategory

    @Prop({ type: HouseDetail })
    detail: HouseDetail

    @Prop({ type: HouseOverview })
    overview: HouseOverview

    @Prop({ index: true })
    houseID: number
}

export const HouseSchema = SchemaFactory.createForClass(House)