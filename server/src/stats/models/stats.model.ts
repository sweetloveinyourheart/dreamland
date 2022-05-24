import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RealEstateStats {
    @Field(returns => Int)
    apartments: number

    @Field(returns => Int)
    houses: number

    @Field(returns => Int)
    lands: number

    @Field(returns => Int)
    businessPremises: number

    @Field(returns => Int)
    motals: number
}

@ObjectType()
export class ProjectStats {
    @Field(returns => Int)
    projects: number
}