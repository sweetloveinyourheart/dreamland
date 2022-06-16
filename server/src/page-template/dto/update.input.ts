import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTemplateInput {
    @Field()
    banner: string
}