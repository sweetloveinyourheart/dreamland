import { Direction, LegalDocuments, OwnerType } from "../enum/real-estate.enum"
import { Prop } from '@nestjs/mongoose';

class UserInfo {
    @Prop(String)
    name: string

    @Prop(String)
    phone: string
}

export class Owner {
    @Prop({ type: OwnerType })
    type: OwnerType

    @Prop({ type: UserInfo })
    user: UserInfo
}

class Pricing {
    @Prop()
    total: number

    @Prop()
    deposit?: number
}

export class Detail {
    @Prop({ type: Pricing })
    pricing: Pricing
}

export class Overview {
    @Prop({ type: Direction })
    doorDirection?: Direction

    @Prop({ type: LegalDocuments })
    legalDocuments?: LegalDocuments
}

export class Media {
    @Prop()
    images: string[]

    @Prop()
    videos: string[]
}

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

class PositionCode {
    @Prop()
    value: string

    @Prop()
    showCode?: boolean
}

export class Position {
    @Prop({ type: PositionCode })
    code?: PositionCode
}

export class Acreage {
    @Prop()
    totalAcreage: number
}

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
}