import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateStatusInput {
    @Field(type => Boolean,{ nullable: true })
    actived?: boolean

    @Field(type => Boolean,{ nullable: true })
    outstanding?: boolean
}