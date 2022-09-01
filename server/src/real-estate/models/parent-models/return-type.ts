import { Field, ObjectType } from "@nestjs/graphql"
import { Apartment } from "../apartment.model"
import { BusinessPremises } from "../business-premises.model"
import { House } from "../house.model"
import { Land } from "../land.model"
import { Motal } from "../motal.model"

@ObjectType()
export class RealEstatePosts {
    @Field(type => [Apartment])
    apartments: Apartment[]

    @Field(type => [House])
    houses: House[]

    @Field(type => [Land])
    lands: Land[]

    @Field(type => [BusinessPremises])
    businessPremises: BusinessPremises[]

    @Field(type => [Motal])
    motals: Motal[]
}
