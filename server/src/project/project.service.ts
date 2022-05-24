import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project as ProjectModel, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectInput } from './dto/create.input';
import { Project } from './models/project.model';
import { ProjectFilter } from './dto/filter.input';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { nonAccentVietnamese } from './utils/vietnamese-accent';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(ProjectModel.name) private projectModel: Model<ProjectDocument>
    ) { }

    async createProject(data: CreateProjectInput): Promise<Project> {
        try {
            const newPj = await this.projectModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.projectName+" "+data.address.province+" "+data.address.district).replace(/\s/g,"-")
            })

            return await newPj.save()
        } catch (error) {
            throw new BadRequestException({
                message: error
            })
        }
    }

    async getProjectByDirectLink(link: string): Promise<Project> {
        try {
            return await this.projectModel.findOne({ directLink: link })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getProjects(filter: ProjectFilter, paging: PaginationArgs): Promise<Project[]> {
        try {
            let query = {
                ...(paging?.cursor && { index: { $gte: paging.cursor } }),
                ...(filter?.price?.max && { "information.purchaseInfo": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.address?.province && { "address.province": filter.address.province }),
                ...(filter?.address?.district && { "address.district": filter.address.district }),
                ...(filter?.address?.ward && { "address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "address.province": filter.address.province }),
                ...(filter?.handOverYear && { "information.handOverYear": { $gte: filter.handOverYear } })
            }

            return await this.projectModel.find(query).limit(paging?.limit)
        } catch (error) {
            throw new NotFoundException(err => ({
                ...err,
                message: "Not found any projects !"
            }))
        }
    }

    async projectStats() {
        try {
            return {
                projects: await this.projectModel.countDocuments({ actived: true })
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }
}
