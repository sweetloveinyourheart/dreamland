import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { RealEstateType } from "src/real-estate/enum/real-estate.enum";
import { Profile } from "src/user/models/user.model";
import { TransactionStatus } from "../enums/transaction.enum";

registerEnumType(TransactionStatus, {
    name: 'TransactionStatus'
})

@ObjectType()
class RealEstateTransaction {
    @Field()
    itemId: string

    @Field(type => RealEstateType)
    itemType: RealEstateType
}

@ObjectType()
class ProjectTransaction {
    @Field()
    itemId: string
}

@ObjectType()
export class Transaction {
    @Field()
    _id?: string

    @Field(type => RealEstateTransaction, { nullable: true })
    realEstate: RealEstateTransaction

    @Field(type => ProjectTransaction, { nullable: true })
    project: ProjectTransaction

    @Field(type => TransactionStatus)
    status: TransactionStatus

    @Field(type => Profile)
    user: Profile

    @Field()
    createdAt: Date
}