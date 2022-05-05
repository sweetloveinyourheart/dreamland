import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Project } from "src/project/models/project.model"
import { ApartmentType, Direction, Furniture, RealEstateCategory, RealEstateStatus } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general"

@ObjectType()
class ApartmentPosition extends Position {
    @Field(type => String, { nullable: true })
    blockName?: string
}

@ObjectType()
export class ApartmentDetail extends Detail {
    @Field(type => ApartmentPosition)
    position: ApartmentPosition

    @Field(type => Address)
    address: Address

    @Field(type => Acreage)
    acreage: Acreage

    @Field(type => Project, { nullable: true })
    project?: Project
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