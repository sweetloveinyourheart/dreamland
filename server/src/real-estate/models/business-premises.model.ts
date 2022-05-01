import { Field, Int, ObjectType } from "@nestjs/graphql"
import { BusinessPremisesType, Furniture, RealEstateCategory } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./general"

@ObjectType()
class BusinessPremisesAddress extends Address {
    @Field(type => String, { nullable: true })
    project?: string
}

@ObjectType()
class BusinessPremisesPosition extends Position {
    @Field(type => String, { nullable: true })
    blockName?: string

    @Field(type => Int, { nullable: true })
    floorNumber?: number
}

@ObjectType()
export class BusinessPremisesDetail extends Detail {
    @Field(type => BusinessPremisesPosition)
    position: BusinessPremisesPosition

    @Field(type => BusinessPremisesAddress)
    address: BusinessPremisesAddress

    @Field(type => Acreage)
    acreage: Acreage
}

@ObjectType()
class BusinessPremisesOverview extends Overview{
    @Field(type => BusinessPremisesType)
    type: BusinessPremisesType

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture
}

@ObjectType()
export class BusinessPremises extends RealEstate {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => BusinessPremisesDetail)
    detail: BusinessPremisesDetail

    @Field(type => BusinessPremisesOverview)
    overview: BusinessPremisesOverview
}