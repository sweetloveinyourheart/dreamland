import { Field, InputType } from "@nestjs/graphql"
import { RealEstateType } from "src/real-estate/enum/real-estate.enum"

@InputType()
export class CreateTransactionInput {
    @Field()
    itemId: string

    @Field(type => RealEstateType)
    itemType: RealEstateType
}
