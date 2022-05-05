import { Field, Float, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Address } from "src/real-estate/models/general";
import { ProjectType, ProjectUtilities } from "../enum/pj.enum";

registerEnumType(ProjectType, {
    name: "ProjectType"
})

registerEnumType(ProjectUtilities, {
    name: "ProjectUtilities"
})

@ObjectType()
class PurInfo {
    @Field({ nullable: true })
    price?: number

    @Field({ nullable: true })
    acreage?: number
}

@ObjectType()
class RentInfo {
    @Field({ nullable: true })
    price?: number

    @Field({ nullable: true })
    acreage?: number
}

@ObjectType()
class ProjectInformation {
    @Field(type => PurInfo, { nullable: true })
    purchaseInfo?: PurInfo

    @Field(type => RentInfo, { nullable: true })
    rentInfo?: RentInfo

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

@ObjectType()
class ProjectMedia {
    @Field(type => [String])
    images: string[]
}

@ObjectType()
class ProjectInvestor {
    @Field()
    logo: string

    @Field()
    name: string

    @Field(type => Int, { nullable: true })
    establishYear: number

    @Field({ nullable: true })
    about: string
}

@ObjectType()
class ProjectProgress {
    @Field()
    image: string

    @Field()
    title: string
}

@ObjectType()
class MasterPlan {
    @Field()
    image: string
    
    @Field()
    title: string
}

@ObjectType()
export class Project {
    @Field(type => String)
    _id?: string

    @Field(type => ProjectMedia)
    media: ProjectMedia

    @Field(type => String)
    projectName: string

    @Field(type => Address)
    address: Address

    @Field(type => ProjectInformation)
    information: ProjectInformation

    @Field(type => [ProjectUtilities])
    utilities: ProjectUtilities[]

    @Field(type => String)
    description: string

    @Field(type => ProjectInvestor)
    investor: ProjectInvestor

    @Field(type => [ProjectProgress])
    progress: ProjectProgress[]

    @Field(type => [MasterPlan])
    masterPlan: MasterPlan[]

    @Field(type => String)
    directLink: string
    
    @Field(type => Date)
    timeStamp: Date

    @Field(type => Boolean)
    actived: boolean
}