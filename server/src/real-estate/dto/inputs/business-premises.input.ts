import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { BusinessPremisesType, Direction, Furniture, LegalDocuments, RealEstateCategory } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, OverviewInput, PositionInput } from './general/create.input';
import { RealEstateFilter } from './general/filter.input';

@InputType()
class BusinessPremisesPositionInput extends PositionInput {
    @Field(type => String, { nullable: true })
    blockName?: string

    @Field(type => Int, { nullable: true })
    floorNumber?: number
}

@InputType()
class BusinessPremisesDetailInput extends DetailInput {
    @Field(type => BusinessPremisesPositionInput, { nullable: true })
    position: BusinessPremisesPositionInput

    @Field(type => AddressInput)
    address: AddressInput

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

    @Field(type => String, { nullable: true })
    project?: string
}

@InputType()
export class BusinessPremisesFilter extends RealEstateFilter {
    @Field(type => BusinessPremisesType, { nullable: true })
    type?: BusinessPremisesType

    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

    @Field(type => String , { nullable: true })
    project?: string
}