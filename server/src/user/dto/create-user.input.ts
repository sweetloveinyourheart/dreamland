import { Field, InputType, Int } from "@nestjs/graphql";
import { Sex, UserRole } from "../enum/user.enum";

@InputType()
export class CreateUserInput {
    @Field()
    phone: string

    @Field({ nullable: true })
    email?: string

    @Field()
    password: string

    @Field()
    name: string

    @Field({ nullable: true })
    avatar?: string

    @Field(type => Date, { nullable: true })
    birthday?: Date

    @Field(type => Sex, { nullable: true })
    sex?: Sex

    @Field({ nullable: true })
    address: string

    @Field(type => [UserRole], { nullable: true })
    roles: UserRole[]

}