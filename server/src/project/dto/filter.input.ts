import { Field, InputType, Int } from "@nestjs/graphql";
import { AddressFilter, PriceFilter } from "src/real-estate/dto/inputs/general/filter.input";

@InputType()
export class ProjectFilter {
    @Field(type => AddressFilter, { nullable: true })
    address?: AddressFilter

    @Field(type => PriceFilter, { nullable: true })
    price?: PriceFilter

    @Field(type => Int, { nullable: true })
    handOverYear?: number
}