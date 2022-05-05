import { Field, InputType, Int } from "@nestjs/graphql";
import { AddressInput } from "src/real-estate/dto/inputs/general/create.input";
import { PriceFilter } from "src/real-estate/dto/inputs/general/filter.input";

@InputType()
export class ProjectFilter {
    @Field(type => AddressInput, { nullable: true })
    address?: AddressInput

    @Field(type => PriceFilter, { nullable: true })
    price?: PriceFilter

    @Field(type => Int, { nullable: true })
    handOverYear?: number
}