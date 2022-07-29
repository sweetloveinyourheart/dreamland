import { Field, InputType } from "@nestjs/graphql"
import { RealEstateType } from "src/real-estate/enum/real-estate.enum"

@InputType()
export class CreateRealEstateTransaction {
    @Field()
    itemId: string

    @Field(type => RealEstateType)
    itemType: RealEstateType
}


@InputType()
export class CreateProjectTransaction {
    @Field()
    itemId: string
}
