import { Field, InputType } from "@nestjs/graphql";
import { PostStatus } from "src/real-estate/enum/real-estate.enum";

@InputType()
export class UpdatePostStatusInput {
    @Field(type => PostStatus,{ nullable: true })
    postStatus?: PostStatus

    @Field(type => Boolean,{ nullable: true })
    outstanding?: boolean

    @Field({ nullable: true })
    code?: string
}