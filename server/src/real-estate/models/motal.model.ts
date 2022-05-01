import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Furniture, RealEstateCategory } from '../enum/real-estate.enum';
import { Acreage, Address, Detail, Overview, RealEstate } from './general';

@ObjectType()
export class MotalDetail extends Detail {
    @Field(type => Address)
    address: Address

    @Field(type => Acreage)
    acreage: Acreage
}

@ObjectType()
class MotalOverview extends Overview {
    @Field(type => Int, { nullable: true })
    numberOfFloors?: number

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture
}

@ObjectType()
export class Motal extends RealEstate {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => MotalDetail)
    detail: MotalDetail

    @Field(type => MotalOverview)
    overview: MotalOverview
}