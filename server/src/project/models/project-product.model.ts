import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql"
import { ProjectProductStatus } from "../enum/pj.enum"
import { Project } from "./project.model"

registerEnumType(ProjectProductStatus, {
    name: "ProjectProductStatus"
})

@ObjectType()
export class ProjectProduct {
    @Field()
    _id?: string

    @Field(type => Project)
    project: Project

    @Field(type => String)
    code: string

    @Field(type => Float)
    totalAcreage: number

    @Field(type => Float)
    quantity: number

    @Field(type => Float)
    price: number

    @Field(type => Float)
    usedAcreage: number

    @Field()
    description: string

    @Field(type => ProjectProductStatus)
    status: ProjectProductStatus

    @Field(type => Date)
    timeStamp: Date
}