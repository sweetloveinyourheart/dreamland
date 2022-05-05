import { ArgsType, Field, Float, InputType, Int } from "@nestjs/graphql";
import { Direction, Furniture, LegalDocuments, RealEstateCategory } from "src/real-estate/enum/real-estate.enum";

@InputType()
class AddressFilter {
    @Field(type => String, { nullable: true })
    projectName?: string

    @Field(type => String, { nullable: true })
    houseNumber?: string

    @Field(type => Boolean, { defaultValue: false })
    showHouseNumber?: boolean

    @Field(type => String, { nullable: true })
    province?: string

    @Field(type => String, { nullable: true })
    district?: string

    @Field(type => String, { nullable: true })
    ward?: string

    @Field(type => String, { nullable: true })
    street?: string
}

@InputType()
export class PriceFilter {
    @Field(type => Float, { defaultValue: 0 })
    min: number

    @Field(type => Float, { nullable: true })
    max?: number
}

@InputType()
class AcreageFilter {
    @Field(type => Float, { defaultValue: 0 })
    min: number

    @Field(type => Float, { nullable: true })
    max?: number
}

@InputType()
export class RealEstateFilter {
    @Field(type => RealEstateCategory)
    category: RealEstateCategory

    @Field(type => AddressFilter, { nullable: true })
    address?: AddressFilter

    @Field(type => PriceFilter, { nullable: true })
    price?: PriceFilter

    @Field(type => AcreageFilter, { nullable: true })
    acreage?: AcreageFilter 

    @Field(type => String, { nullable: true })
    project?: string
}