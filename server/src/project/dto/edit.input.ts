import { Field, InputType } from "@nestjs/graphql";
import { ProjectProductStatus } from "../enum/pj.enum";

@InputType()
export class UpdateStatusInput {
    @Field(type => Boolean,{ nullable: true })
    actived?: boolean

    @Field(type => Boolean,{ nullable: true })
    outstanding?: boolean
}

@InputType()
export class UpdateProductStatus {
    @Field(type => ProjectProductStatus,{ nullable: true })
    status: ProjectProductStatus
}