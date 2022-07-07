import { Field, InputType } from "@nestjs/graphql"
import { UserRole } from "../enum/user.enum"

@InputType()
export class FindUserInput {
    @Field(type => Number, { defaultValue: 0 })
    cursor: number

    @Field(type => Number, { defaultValue: 30 })
    limit: number
}
