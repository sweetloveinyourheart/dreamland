import { Field, Int, ObjectType } from "@nestjs/graphql"
import { ApartmentType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general"

@ObjectType()
class ApartmentAddress extends Address {
    @Field(type => String, { nullable: true })
    project?: string
}

@ObjectType()
class ApartmentPosition extends Position {
    @Field(type => String, { nullable: true })
    blockName?: string
}

@ObjectType()
export class ApartmentDetail extends Detail {
    @Field(type => ApartmentPosition)
    position: ApartmentPosition

    @Field(type => ApartmentAddress)
    address: ApartmentAddress

    @Field(type => Acreage)
    acreage: Acreage
}

@ObjectType()
class ApartmentOverview extends Overview{
    @Field(type => ApartmentType)
    type: ApartmentType

    @Field(type => RealEstateStatus)
    status: RealEstateStatus

    @Field(type => Direction)
    balconyDirection?: Direction

    @Field(type => Int)
    numberOfBedrooms: number

    @Field(type => Int, { nullable: true })
    numberOfBathrooms?: number

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture
}

@ObjectType()
export class Apartment extends RealEstate {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => ApartmentDetail)
    detail: ApartmentDetail

    @Field(type => ApartmentOverview)
    overview: ApartmentOverview
}