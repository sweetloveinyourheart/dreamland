import { Field, Float, Int, InputType } from "@nestjs/graphql";
import { AddressInput } from "src/real-estate/dto/inputs/general/create.input";
import { Address } from "src/real-estate/models/general";
import { ProjectType, ProjectUtilities } from "../enum/pj.enum";

@InputType()
class PurInfoInput {
    @Field({ nullable: true })
    price?: number

    @Field({ nullable: true })
    acreage?: number
}

@InputType()
class RentInfoInput  {
    @Field({ nullable: true })
    price?: number

    @Field({ nullable: true })
    acreage?: number
}

@InputType()
class ProjectInformationInput  {
    @Field(type => PurInfoInput )
    purchaseInfo: PurInfoInput 

    @Field(type => RentInfoInput )
    rentInfo: RentInfoInput 

    @Field(type => String, { nullable: true })
    startedAt?: string

    @Field(type => Number, { nullable: true })
    handOverYear?: number

    @Field()
    investorName: string

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
class ProjectMediaInput  {
    @Field(type => [String])
    images: string[]
}

@InputType()
class ProjectInvestorInput  {
    @Field()
    logo: string

    @Field()
    name: string

    @Field(type => Int, { nullable: true })
    establishYear: number

    @Field()
    about: string
}

@InputType()
class ProjectProgressInput  {
    @Field()
    image: string

    @Field()
    title: string
}

@InputType()
class MasterPlanInput  {
    @Field()
    image: string
    
    @Field()
    title: string
}

@InputType()
export class CreateProjectInput {
    @Field(type => ProjectMediaInput )
    media: ProjectMediaInput 

    @Field(type => String)
    projectName: string

    @Field(type => AddressInput)
    address: AddressInput

    @Field(type => ProjectInformationInput )
    information: ProjectInformationInput 

    @Field(type => [ProjectUtilities])
    utilities: ProjectUtilities[]

    @Field(type => String)
    description: string

    @Field(type => ProjectInvestorInput )
    investor: ProjectInvestorInput 

    @Field(type => [ProjectProgressInput ])
    progress: ProjectProgressInput []

    @Field(type => [MasterPlanInput] )
    masterPlan: MasterPlanInput[]
}