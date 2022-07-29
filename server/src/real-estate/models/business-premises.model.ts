import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Project } from "src/project/models/project.model"
import { BusinessPremisesType, Furniture, RealEstateCategory } from "../enum/real-estate.enum"
import { Acreage, Address, Detail, Overview, Position, RealEstate } from "./parent-models/general"

@ObjectType()
class BusinessPremisesPosition extends Position {
    @Field(type => String, { nullable: true })
    blockName?: string

    @Field(type => Int, { nullable: true })
    floorNumber?: number
}

@ObjectType()
export class BusinessPremisesDetail extends Detail {
    @Field(type => BusinessPremisesPosition, { nullable: true })
    position: BusinessPremisesPosition

    @Field(type => Address)
    address: Address

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