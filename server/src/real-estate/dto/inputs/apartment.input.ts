import { InputType, Field, Int } from '@nestjs/graphql';
import { ApartmentType, Direction, Furniture, LegalDocuments, OwnerType, RealEstateCategory, RealEstateStatus } from '../../enum/real-estate.enum';
import { AcreageInput, AddressInput, CreateRealEstateInput, DetailInput, MediaInput, OverviewInput, OwnerInput, PositionInput } from './general/create.input';
import { RealEstateFilter } from './general/filter.input';

@InputType()
class ApartmentOverviewInput extends OverviewInput {
    @Field(type => ApartmentType)
    type: ApartmentType

    @Field(type => RealEstateStatus, { nullable: true })
    status: RealEstateStatus

    @Field(type => Direction, { nullable: true })
    balconyDirection?: Direction

    @Field(type => Int)
    numberOfBedrooms: number

    @Field(type => Int, { nullable: true })
    numberOfBathrooms?: number

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture
}


@InputType()
class ApartmentPositionInput extends PositionInput {
    @Field(type => String, { nullable: true })
    blockName?: string

    @Field(type => String, { nullable: true })
    floorNumber?: string
}

@InputType()
class ApartmentDetailInput extends DetailInput {
    @Field(type => ApartmentPositionInput, { nullable: true })
    position: ApartmentPositionInput

    @Field(type => AddressInput)
    address: AddressInput

    @Field(type => AcreageInput)
    acreage: AcreageInput

    @Field(type => String, { nullable: true })
    project?: string
}

@InputType()
export class CreateApartmentInput extends CreateRealEstateInput {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => ApartmentDetailInput)
    detail: ApartmentDetailInput

    @Field(type => ApartmentOverviewInput)
    overview: ApartmentOverviewInput
}

@InputType()
export class ApartmentFilter extends RealEstateFilter {
    @Field(type => ApartmentType, { nullable: true })
    type?: ApartmentType

    @Field(type => Int, { nullable: true })
    numberOfBedrooms?: number

    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => Direction, { nullable: true })
    balconyDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments

    @Field(type => Furniture, { nullable: true })
    furniture?: Furniture

    @Field(type => String, { nullable: true })
    project?: string
}