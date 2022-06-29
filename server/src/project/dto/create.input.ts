import { Field, Float, Int, InputType } from "@nestjs/graphql";
import { AddressInput } from "src/real-estate/dto/inputs/general/create.input";
import { ProjectType } from "../enum/pj.enum";

@InputType()
class ProjectUtilitiesInput {
    @Field()
    image: string

    @Field()
    title: string
}

@InputType()
class ProjectInformationInput {
    @Field(type => Float)
    purchaseInfo: number

    @Field(type => Float, { nullable: true })
    rentInfo: number

    @Field(type => String, { nullable: true })
    startedAt?: string

    @Field(type => Number, { nullable: true })
    handOverYear?: number

    @Field(type => ProjectType)
    type: ProjectType

    @Field(type => Float, { nullable: true })
    acreage?: number

    @Field(type => String, { nullable: true })
    scale?: string

    @Field(type => String, { nullable: true })
    progressStatus?: string

    @Field(type => String, { nullable: true })
    status?: string
}

@InputType()
class ProjectMediaInput {
    @Field(type => [String])
    images: string[]
}

@InputType()
class ProjectInvestorInput {
    @Field()
    name: string

    @Field(type => Int, { nullable: true })
    establishYear: number

    @Field()
    about: string
}

@InputType()
class MasterPlanInput {
    @Field()
    image: string

    @Field()
    title: string
}

@InputType()
export class CreateProjectInput {
    @Field(type => ProjectMediaInput)
    media: ProjectMediaInput

    @Field(type => String)
    projectName: string

    @Field(type => AddressInput)
    address: AddressInput

    @Field(type => ProjectInformationInput)
    information: ProjectInformationInput

    @Field(type => [ProjectUtilitiesInput])
    utilities: ProjectUtilitiesInput[]

    @Field(type => String)
    description: string

    @Field(type => ProjectInvestorInput)
    investor: ProjectInvestorInput

    @Field(type => [MasterPlanInput])
    masterPlan: MasterPlanInput[]

    @Field(type => String, { nullable: true })
    virtual3DLink?: string

    @Field(type => String, { nullable: true })
    googleMapsLink?: string
}