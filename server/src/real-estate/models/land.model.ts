import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Project } from 'src/project/models/project.model';
import { LandType,  RealEstateCategory } from '../enum/real-estate.enum';
import { Acreage, Address, Detail, Overview, Position, RealEstate } from './parent-models/general';

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
    @Field(type => LandPosition, { nullable: true })
    position: LandPosition

    @Field(type => Address)
    address: Address

    @Field(type => LandAcreage)
    acreage: LandAcreage

    @Field(type => Project, { nullable: true })
    project?: Project
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