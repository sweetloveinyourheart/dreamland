import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageTemplate {
    @Field()
    _id: string

    @Field()
    pageName: string

    @Field()
    banner: string

}