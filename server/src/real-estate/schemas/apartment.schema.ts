import { ApartmentType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ApartmentDocument = Apartment & Document;

class ApartmentAddress extends Address {
    @Prop({ type: MongooseSchema.Types.ObjectId })
    project?: string
}

class ApartmentPosition extends Position {
    @Prop()
    blockName?: string
}

export class ApartmentDetail extends Detail {
    @Prop({ type: ApartmentPosition })
    position: ApartmentPosition

    @Prop({ type: ApartmentAddress })
    address: ApartmentAddress

    @Prop({ type: Acreage })
    acreage: Acreage
}

class ApartmentOverview extends Overview {
    @Prop({ type: ApartmentType })
    type: ApartmentType

    @Prop({ type: RealEstateStatus })
    status: RealEstateStatus

    @Prop({ type: Direction })
    balconyDirection?: Direction


    @Prop()
    numberOfBedrooms: number

    @Prop()
    numberOfBathrooms?: number

    @Prop({ type: Furniture })
    furniture?: Furniture
}

@Schema()
export class Apartment extends RealEstate {
    @Prop()
    category: RealEstateCategory

    @Prop({ type: ApartmentDetail })
    detail: ApartmentDetail

    @Prop({ type: ApartmentOverview })
    overview: ApartmentOverview

    @Prop({ index: true })
    apartmentID: number
}

const ApartmentSchema = SchemaFactory.createForClass(Apartment)
export { ApartmentSchema }
