import { Field, Float, InputType } from "@nestjs/graphql"
import { Direction, LegalDocuments, OwnerType } from "../../../enum/real-estate.enum"

@InputType()
class PositionCodeInput {
    @Field(type => String)
    value: string

    @Field(type => Boolean, { defaultValue: false })
    showCode?: boolean
}

@InputType()
export class PositionInput {
    @Field(type => PositionCodeInput, { nullable: true })
    code?: PositionCodeInput
}

@InputType()
export class MediaInput {
    @Field(type => [String])
    images: string[]

    @Field(type => [String])
    videos: string[]
}

@InputType()
export class AddressInput {
    @Field(type => String, { nullable: true })
    houseNumber?: string

    @Field(type => Boolean, { defaultValue: false })
    showHouseNumber?: boolean

    @Field(type => String)
    province: string

    @Field(type => String)
    district: string

    @Field(type => String)
    ward: string

    @Field(type => String)
    street: string
}

@InputType()
export class AcreageInput {
    @Field(type => Float)
    totalAcreage: number
}

@InputType()
class PricingInput {
    @Field(type => Float)
    total: number

    @Field(type => Float, { nullable: true })
    deposit?: number
}

@InputType()
export class DetailInput {
    @Field(type => PricingInput)
    pricing: PricingInput
}

@InputType()
class UserInfoInput {
    @Field(type => String)
    name: string

    @Field(type => String)
    phone: string
}

@InputType()
export class OwnerInput {
    @Field(type => OwnerType)
    type: OwnerType

    @Field(type => UserInfoInput)
    user: UserInfoInput
}


@InputType()
export class OverviewInput {
    @Field(type => Direction, { nullable: true })
    doorDirection?: Direction

    @Field(type => LegalDocuments, { nullable: true })
    legalDocuments?: LegalDocuments
}


@InputType()
export class CreateRealEstateInput {
    @Field(type => String)
    title: string

    @Field(type => String)
    description: string

    @Field(type => MediaInput)
    media: MediaInput

    @Field(type => OwnerInput)
    owner: OwnerInput

    @Field(type => String, { nullable: true })
    virtual3DLink?: string

    @Field(type => String, { nullable: true })
    googleMapsLink?: string

    @Field({ nullable: true })
    code?: string
}