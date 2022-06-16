import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Login {
    @Field()
    accessToken: string

    @Field()
    refreshToken: string
}