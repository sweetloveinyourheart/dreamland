import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { LandType, Furniture, RealEstateCategory, Direction, LegalDocuments } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, OverviewInput, PositionInput } from './general/create.input';
import { RealEstateFilter } from './general/filter.input';

@InputType()
class LandPositionInput extends PositionInput {
    @Field(type => String, { nullable: true })
    blockName?: string
}

@InputType()
class LandAcreageInput extends AcreageInput {
    @Field(type => Float, { nullable: true })
    height?: number

    @Field(type => Float, { nullable: true })
    width?: number
}

@InputType()
class LandDetailInput extends DetailInput {
    @Field(type => LandPositionInput, { nullable: true })
    position: LandPositionInput

    @Field(type => AddressInput)
    address: AddressInput

    @Field(type => LandAcreageInput)
    acreage: LandAcreageInput

    @Field(type => String, { nullable: true })
    project?: string
}


@InputType()
class LandOverviewInput extends OverviewInput {
    @Field(type => LandType)
    type: LandType

    @Field(type => Boolean, { nullable: true })
    carAlley?: boolean

    @Field(type => Boolean, { nullable: true })
    noHau?: boolean

    @Field(type => Boolean, { nullable: true })
    frontispiece?: boolean
}

@InputType()
export class CreateLandInput extends CreateRealEstateInput {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => LandDetailInput)
    detail: LandDetailInput

    @Field(type => LandOverviewInput)
    overview: LandOverviewInput
}

@InputType()
export class LandFilter extends RealEstateFilter {
    @Field(type => LandType, { nullable: true })
    type?: LandType

    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

    @Field(type => Boolean, { nullable: true })
    carAlley?: boolean

    @Field(type => Boolean, { nullable: true })
    noHau?: boolean

    @Field(type => Boolean, { nullable: true })
    frontispiece?: boolean

    @Field(type => String, { nullable: true })
    project?: string
}