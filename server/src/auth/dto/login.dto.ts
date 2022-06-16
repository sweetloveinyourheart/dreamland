import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
    @Field()
    phone: string

    @Field()
    password: string
}