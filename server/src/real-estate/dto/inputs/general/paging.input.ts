import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginationArgs {
    @Field(type => Number, { defaultValue: 0 })
    cursor: number

    @Field(type => Number, { defaultValue: 5 })
    limit: number
}