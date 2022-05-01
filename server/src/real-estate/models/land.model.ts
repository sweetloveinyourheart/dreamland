import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { LandType,  RealEstateCategory } from '../enum/real-estate.enum';
import { Acreage, Address, Detail, Overview, Position, RealEstate } from './general';

@ObjectType()
class LandAddress extends Address {
    @Field(type => String, { nullable: true })
    project?: string
}

@ObjectType()
class LandPosition extends Position {
    @Field(type => String, { nullable: true })
    blockName?: string
}

@ObjectType()
class LandAcreage extends Acreage {
    @Field(type => Float, { nullable: true })
    height?: number

    @Field(type => Float, { nullable: true })
    width?: number
}

@ObjectType()
export class LandDetail extends Detail {
    @Field(type => LandPosition)
    position: LandPosition

    @Field(type => LandAddress)
    address: LandAddress

    @Field(type => LandAcreage)
    acreage: LandAcreage
}

@ObjectType()
class LandOverview extends Overview {
    @Field(type => LandType)
    type: LandType

    @Field(type => Boolean, { nullable: true })
    carAlley?: boolean

    @Field(type => Boolean, { nullable: true })
    noHau?: boolean

    @Field(type => Boolean, { nullable: true })
    frontispiece?: boolean
}

@ObjectType()
export class Land extends RealEstate {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => LandDetail)
    detail: LandDetail

    @Field(type => LandOverview)
    overview: LandOverview
}