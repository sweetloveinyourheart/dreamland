import { HouseType, Furniture, RealEstateCategory } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./parent-classes/general.schema"
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project } from "src/project/schemas/project.schema";

export type  HouseDocument = House & Document;

@Schema({ _id: false, id: false })
class HousePosition extends Position {
    @Prop()
    blockName?: string
}

@Schema({ _id: false, id: false })
class HouseAcreage extends Acreage {
    @Prop()
    usedAcreage?: number

    @Prop()
    height?: number

    @Prop()
    width?: number
}

@Schema({ _id: false, id: false })
class HouseDetail extends Detail {
    @Prop({ type: HousePosition })
    position: HousePosition

    @Prop({ type: Address })
    address: Address

    @Prop({ type: HouseAcreage })
    acreage: HouseAcreage

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Project", autopopulate: true })
    project?: Project
}

@Schema({ _id: false, id: false })
class HouseOverview extends Overview {
    @Prop({ enum: HouseType })
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

    @Prop({ enum: Furniture })
    furniture?: Furniture
}

@Schema()
export class House extends RealEstate {
    @Prop({ enum: RealEstateCategory })
    category: RealEstateCategory

    @Prop({ type: HouseDetail })
    detail: HouseDetail

    @Prop({ type: HouseOverview })
    overview: HouseOverview
}

export const HouseSchema = SchemaFactory.createForClass(House)