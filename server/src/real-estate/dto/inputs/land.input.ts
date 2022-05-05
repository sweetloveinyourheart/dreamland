import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { LandType, Furniture, RealEstateCategory } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, OverviewInput, PositionInput } from './general/create.input';

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
    @Field(type => LandPositionInput)
    position: LandPositionInput

    @Field(type => AddressInput)
    address: AddressInput

    @Field(type => LandAcreageInput)
    acreage: LandAcreageInput
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

    @Field(type => String, { nullable: true })
    project?: string
}