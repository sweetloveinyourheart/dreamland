import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Blog {
    @Field()
    _id?: string

    @Field()
    content: string

    @Field()
    image: string

    @Field()
    link: string

    @Field()
    timeStamp: Date

    @Field()
    title: string
}