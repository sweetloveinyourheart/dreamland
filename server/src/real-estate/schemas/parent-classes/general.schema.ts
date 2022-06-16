import { Direction, LegalDocuments, OwnerType } from "../../enum/real-estate.enum"
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, id: false })
class UserInfo {
    @Prop(String)
    name: string

    @Prop(String)
    phone: string
}

@Schema({ _id: false, id: false })
export class Owner {
    @Prop({ enum: OwnerType })
    type: OwnerType

    @Prop({ type: UserInfo })
    user: UserInfo
}

@Schema({ _id: false, id: false })
class Pricing {
    @Prop()
    total: number

    @Prop()
    deposit?: number
}

@Schema({ _id: false, id: false })
export class Detail {
    @Prop({ type: Pricing })
    pricing: Pricing
}

@Schema({ _id: false, id: false })
export class Overview {
    @Prop({ enum: Direction })
    doorDirection?: Direction

    @Prop({ enum: LegalDocuments })
    legalDocuments?: LegalDocuments
}

@Schema({ _id: false, id: false })
export class Media {
    @Prop()
    images: string[]

    @Prop()
    videos: string[]
}

@Schema({ _id: false, id: false })
export class Address {
    @Prop()
    houseNumber?: string

    @Prop()
    showHouseNumber?: boolean

    @Prop({ required: true })
    province: string

    @Prop({ required: true })
    district: string

    @Prop({ required: true })
    ward: string

    @Prop({ required: true })
    street: string
}

@Schema({ _id: false, id: false })
class PositionCode {
    @Prop()
    value: string

    @Prop()
    showCode?: boolean
}

@Schema({ _id: false, id: false })
export class Position {
    @Prop({ type: PositionCode })
    code?: PositionCode
}

@Schema({ _id: false, id: false })
export class Acreage {
    @Prop()
    totalAcreage: number
}

@Schema()
export class RealEstate {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop({type: Media})
    media: Media

    @Prop({type: Owner})
    owner: Owner

    @Prop()
    timeStamp: Date

    @Prop({ default: true })
    actived: boolean

    @Prop()
    directLink: string

    @Prop()
    virtual3DLink?: string

    @Prop({ default: false })
    outstanding: boolean

    @Prop()
    index: number
}