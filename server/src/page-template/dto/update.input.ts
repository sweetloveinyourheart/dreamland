import { Field, InputType } from "@nestjs/graphql";

@InputType()
class BannerInput {
    @Field()
    imgUrl: string

    @Field({ nullable: true })
    directLink: string
}

@InputType()
export class UpdateTemplateInput {
    @Field()
    banner: BannerInput
}