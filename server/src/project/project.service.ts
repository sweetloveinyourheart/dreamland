import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project as ProjectModel, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectInput } from './dto/create.input';
import { Project } from './models/project.model';
import { ProjectFilter } from './dto/filter.input';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(ProjectModel.name) private projectModel: Model<ProjectDocument>
    ) { }

    private nonAccentVietnamese(str: string) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    async createProject(data: CreateProjectInput): Promise<Project> {
        try {
            const newPj = await this.projectModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: this.nonAccentVietnamese(data.projectName+" "+data.address.province+" "+data.address.district).replace(/\s/g,"-")
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
                ...(paging?.cursor && { projectID: { $gte: paging.cursor } }),
                ...(filter?.price?.max && { "information.purchaseInfo.acreage": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.address?.province && { "address.province": filter.address.province }),
                ...(filter?.address?.district && { "address.district": filter.address.district }),
                ...(filter?.address?.ward && { "address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "address.province": filter.address.province }),
                ...(filter?.handOverYear && { "information.handOverYear": { $gte: filter.handOverYear } })
            }

            return await this.projectModel.find(query).limit(paging?.limit)
        } catch (error) {
            console.log(error);

            throw new NotFoundException(err => ({
                ...err,
                message: "Not found any projects !"
            }))
        }
    }
}
