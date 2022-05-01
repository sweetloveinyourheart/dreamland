import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { HouseType, Furniture, RealEstateCategory, Direction, LegalDocuments } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, OverviewInput, PositionInput } from './general/create.input';
import { RealEstateFilter } from './general/filter.input';

@InputType()
class HouseOverviewInput extends OverviewInput {
    @Field(type => HouseType)
    type: HouseType

    @Field(type => Int, { nullable: true })
    numberOfFloors?: number

    @Field(type => Int)
    numberOfBedrooms: number

    @Field(type => Int, { nullable: true })
    numberOfBathrooms?: number

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture

    @Field(type => Boolean, { nullable: true })
    carAlley?: boolean

    @Field(type => Boolean, { nullable: true })
    noHau?: boolean

    @Field(type => Boolean, { nullable: true })
    frontispiece?: boolean
}

@InputType()
class HouseAddressInput extends AddressInput {
    @Field(type => String, { nullable: true })
    project?: string
}

@InputType()
class HousePositionInput extends PositionInput {
    @Field(type => String, { nullable: true })
    blockName?: string
}

@InputType()
class HouseAcreageInput extends AcreageInput {
    @Field(type => Float, { nullable: true })
    usedAcreage?: number

    @Field(type => Float, { nullable: true })
    height?: number

    @Field(type => Float, { nullable: true })
    width?: number
}

@InputType()
class HouseDetailInput extends DetailInput {
    @Field(type => HousePositionInput)
    position: HousePositionInput

    @Field(type => HouseAddressInput)
    address: HouseAddressInput

    @Field(type => HouseAcreageInput)
    acreage: HouseAcreageInput
}

@InputType()
export class CreateHouseInput extends CreateRealEstateInput {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => HouseDetailInput)
    detail: HouseDetailInput

    @Field(type => HouseOverviewInput)
    overview: HouseOverviewInput
}

@InputType()
export class HouseFilter extends RealEstateFilter {
    @Field(type => HouseType, { nullable: true })
    type?: HouseType

    @Field(type => Int, { nullable: true })
    numberOfBedrooms?: number

    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture

    @Field(type => Boolean, { nullable: true })
    carAlley?: boolean

    @Field(type => Boolean, { nullable: true })
    noHau?: boolean

    @Field(type => Boolean, { nullable: true })
    frontispiece?: boolean
}