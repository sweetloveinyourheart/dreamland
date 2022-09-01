import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Sex, UserRole } from "../enum/user.enum"

registerEnumType(Sex, {
    name: 'Sex',
});

registerEnumType(UserRole, {
    name: 'UserRole',
});

@ObjectType()
export class User {
    @Field(type => String)
    phone: string

    @Field(type => String)
    password: string

    @Field(type => String, { nullable: true })
    email?: string

    @Field(type => String)
    name: string

    @Field(type => String, { nullable: true })
    avatar?: string

    @Field(type => Date, { nullable: true })
    birthday?: Date

    @Field(type => Sex, { nullable: true })
    sex?: Sex

    @Field(type => String, { nullable: true })
    address?: string

    @Field(type => Date)
    createdAt: Date

    @Field(type => [UserRole])
    roles: UserRole[]

    @Field(type => Boolean)
    actived: boolean
}

@ObjectType()
export class Profile {
    @Field(type => String)
    phone: string

    @Field(type => String, { nullable: true })
    email?: string

    @Field(type => String)
    name: string

    @Field(type => String, { nullable: true })
    avatar?: string

    @Field(type => Date, { nullable: true })
    birthday?: Date

    @Field(type => Sex, { nullable: true })
    sex?: Sex

    @Field(type => String, { nullable: true })
    address?: string

    @Field(type => [UserRole])
    roles: UserRole[]

    @Field(type => Date)
    createdAt: Date
}

@ObjectType()
export class UserListResponse {
    @Field(type => [User])
    users: User[]

    @Field(type => Int)
    count: number
}