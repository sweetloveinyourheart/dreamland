import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Direction, Furniture, LegalDocuments, RealEstateCategory } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, OverviewInput, PositionInput } from './general/create.input';
import { RealEstateFilter } from './general/filter.input';

@InputType()
class MotalDetailInput extends DetailInput {
    @Field(type => AddressInput)
    address: AddressInput

    @Field(type => AcreageInput)
    acreage: AcreageInput
}

@InputType()
class MotalOverviewInput extends OverviewInput {
    @Field(type => Int, { nullable: true })
    numberOfFloors?: number

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture
}

@InputType()
export class CreateMotalInput extends CreateRealEstateInput {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => MotalDetailInput)
    detail: MotalDetailInput

    @Field(type => MotalOverviewInput)
    overview: MotalOverviewInput
}

@InputType()
export class MotalFilter extends RealEstateFilter {
    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

    @Field(type => Int, { nullable: true })
    numberOfBedrooms?: number
}