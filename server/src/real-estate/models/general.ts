import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql"
import { ApartmentType, BusinessPremisesType, Direction, Furniture, HouseType, LandType, LegalDocuments, OwnerType, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"

registerEnumType(ApartmentType, {
    name: "ApartmentType"
})

registerEnumType(RealEstateStatus, {
    name: 'RealEstateStatus'
})

registerEnumType(HouseType, {
    name: 'HouseType',
});

registerEnumType(LandType, {
    name: 'LandType',
});

registerEnumType(BusinessPremisesType, {
    name: 'BusinessPremisesType',
});

registerEnumType(Direction, {
    name: 'Direction',
});

registerEnumType(Furniture, {
    name: 'Furniture',
});

registerEnumType(LegalDocuments, {
    name: 'LegalDocuments',
});

registerEnumType(OwnerType, {
    name: 'OwnerType',
});

registerEnumType(RealEstateCategory, {
    name: 'RealEstateCategory',
});

@ObjectType()
class UserInfo {
    @Field(type => String)
    name: string

    @Field(type => String)
    phone: string
}

@ObjectType()
export class Owner {
    @Field(type => OwnerType)
    type: OwnerType

    @Field(type => UserInfo)
    user: UserInfo
}

@ObjectType()
class Pricing {
    @Field(type => Float)
    total: number

    @Field(type => Float, { nullable: true })
    deposit?: number
}

@ObjectType()
export class Detail {
    @Field(type => Pricing)
    pricing: Pricing
}


@ObjectType()
export class Overview {
    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

}

@ObjectType()
export class Media {
    @Field(type => [String])
    images: string[]

    @Field(type => [String])
    videos: string[]
}

@ObjectType()
export class Address {
    @Field(type => String, { nullable: true })
    houseNumber?: string

    @Field(type => Boolean, { defaultValue: false })
    showHouseNumber?: boolean

    @Field(type => String)
    province: string

    @Field(type => String)
    district: string

    @Field(type => String)
    ward: string

    @Field(type => String)
    street: string
}

@ObjectType()
class PositionCode {
    @Field(type => String)
    value: string

    @Field(type => Boolean, { defaultValue: false })
    showCode?: boolean
}

@ObjectType()
export class Position {
    @Field(type => PositionCode, { nullable: true })
    code?: PositionCode
}

@ObjectType()
export class Acreage {
    @Field(type => Float)
    totalAcreage: number
}

@ObjectType()
export class RealEstate {
    @Field(type => String)
    title: string

    @Field(type => String)
    description: string

    @Field(type => Media)
    media: Media

    @Field(type => Owner)
    owner: Owner

    @Field(type => Date)
    timeStamp: Date

    @Field(type => Boolean)
    actived: boolean
}
