import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { BusinessPremisesType, Furniture, RealEstateCategory } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, OverviewInput, PositionInput } from './general/create.input';

@InputType()
class BusinessPremisesAddressInput extends AddressInput {
    @Field(type => String, { nullable: true })
    project?: string
}

@InputType()
class BusinessPremisesPositionInput extends PositionInput {
    @Field(type => String, { nullable: true })
    blockName?: string

    @Field(type => Int, { nullable: true })
    floorNumber?: number
}

@InputType()
class BusinessPremisesDetailInput extends DetailInput {
    @Field(type => BusinessPremisesPositionInput)
    position: BusinessPremisesPositionInput

    @Field(type => BusinessPremisesAddressInput)
    address: BusinessPremisesAddressInput

    @Field(type => AcreageInput)
    acreage: AcreageInput
}


@InputType()
class BusinessPremisesOverviewInput extends OverviewInput {
    @Field(type => BusinessPremisesType)
    type: BusinessPremisesType

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture
}

@InputType()
export class CreateBusinessPremisesInput extends CreateRealEstateInput {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => BusinessPremisesDetailInput)
    detail: BusinessPremisesDetailInput

    @Field(type => BusinessPremisesOverviewInput)
    overview: BusinessPremisesOverviewInput
}