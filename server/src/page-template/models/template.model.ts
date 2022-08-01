import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class Banner {
    @Field()
    imgUrl: string

    @Field({ nullable: true })
    directLink: string
}

@ObjectType()
export class PageTemplate {
    @Field()
    _id: string

    @Field()
    pageName: string

    @Field(type => Banner)
    banner: Banner

}