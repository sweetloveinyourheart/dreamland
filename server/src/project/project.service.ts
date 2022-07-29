import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project as ProjectModel, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectInput, CreateProjectProductInput } from './dto/create.input';
import { Project } from './models/project.model';
import { ProjectFilter } from './dto/filter.input';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { nonAccentVietnamese } from './utils/vietnamese-accent';
import { UpdateProductStatus, UpdateStatusInput } from './dto/edit.input';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProjectProduct, ProjectProductDocument } from './schemas/project-product.schema';
import { ProjectProductStatus } from './enum/pj.enum';
import { CreateProjectTransaction } from 'src/transaction/dto/create.input';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(ProjectModel.name) private projectModel: Model<ProjectDocument>,
        @InjectModel(ProjectProduct.name) private projectProductModel: Model<ProjectProductDocument>,
        private cloudinaryService: CloudinaryService,

    ) { }

    async createProject(data: CreateProjectInput): Promise<Project> {
        try {
            const newPj = await this.projectModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.projectName + " " + data.address.province + " " + data.address.district).replace(/\s/g, "-")
            })

            return await newPj.save()
        } catch (error) {
            throw new BadRequestException({
                message: error
            })
        }
    }

    async createProjectProduct(data: CreateProjectProductInput): Promise<ProjectProduct> {
        try {
            const newProduct = await this.projectProductModel.create({
                ...data,
                timeStamp: new Date()
            })

            return await newProduct.save()
        } catch (error) {
            throw new BadRequestException({
                message: error
            })
        }
    }

    async editProject(projectId: string, updateData: CreateProjectInput | null, updateState: UpdateStatusInput | null): Promise<Project> {
        try {
            const updated = await this.projectModel.findByIdAndUpdate(projectId, {
                ...updateData,
                ...updateState
            })

            if (updateData) {
                updated.media.images.forEach(async (image) => {
                    const exist = updateData.media.images.find(img => img === image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(image)
                    }
                })

                updated.utilities.forEach(async (util) => {
                    const exist = updateData.utilities.find(updateUtil => updateUtil.image === util.image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(util.image)
                    }
                })

                updated.masterPlan.forEach(async (item) => {
                    const exist = updateData.masterPlan.find(updateItem => updateItem.image === item.image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(item.image)
                    }
                })
            }

            return updated
        } catch (error) {
            throw new BadRequestException(err => ({
                ...err,
                message: "Update failed !"
            }))
        }
    }

    async editProjectProduct(id: string, updateState: UpdateProductStatus | null) {
        const updated = await this.projectProductModel.findByIdAndUpdate(id, updateState)
        return updated
    }

    async getProjectByDirectLink(link: string): Promise<Project> {
        try {
            return await this.projectModel.findOne({ directLink: link })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getProjects(filter: ProjectFilter, paging: PaginationArgs, search: string | undefined): Promise<Project[]> {
        try {
            let searchQuery = undefined
            if (search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = { 
                actived: true,
                ...(paging?.cursor && { index: { $gte: paging.cursor } }),
                ...(filter?.price?.max && { "information.purchaseInfo": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.address?.province && { "address.province": filter.address.province }),
                ...(filter?.address?.district && { "address.district": filter.address.district }),
                ...(filter?.address?.ward && { "address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "address.province": filter.address.province }),
                ...(filter?.handOverYear && { "information.handOverYear": { $gte: filter.handOverYear } }),
                ...(searchQuery && { projectName: { $regex: searchQuery } })
            }

            return await this.projectModel.find(query).limit(paging?.limit)
        } catch (error) {
            throw new NotFoundException(err => ({
                ...err,
                message: "Not found any projects !"
            }))
        }
    }

    async getAllProjects(): Promise<Project[]> {
        try {
            return await this.projectModel.find()
        } catch (error) {
            throw new NotFoundException(err => ({
                ...err,
                message: "Not found any projects !"
            }))
        }
    }

    async getProjectProducts(project: string): Promise<ProjectProduct[]> {
        const products = await this.projectProductModel.find({ project })
        return products
    }

    async getProjectProductById(id: string): Promise<ProjectProduct> {
        const product = await this.projectProductModel.findById(id)
        return product
    }

    async getOutstandingProjects(paging: PaginationArgs): Promise<Project[]> {
        try {
            return await this.projectModel.find({ actived: true, outstanding: true }).limit(paging?.limit).skip(paging?.cursor)
        } catch (error) {
            throw new NotFoundException()
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

    async processingTransaction(item: CreateProjectTransaction, status: ProjectProductStatus) {
        return await this.projectProductModel.findByIdAndUpdate(item.itemId, { status })
    }

    async removeProject(id: string) {
        const deleted = await this.projectModel.findByIdAndDelete(id)

        if (deleted) {
            deleted.media.images.forEach(async (image) => {
                const exist = deleted.media.images.find(img => img === image)
                if (!exist) {
                    await this.cloudinaryService.removeFile(image)
                }
            })

            deleted.utilities.forEach(async (util) => {
                const exist = deleted.utilities.find(updateUtil => updateUtil.image === util.image)
                if (!exist) {
                    await this.cloudinaryService.removeFile(util.image)
                }
            })

            deleted.masterPlan.forEach(async (item) => {
                const exist = deleted.masterPlan.find(updateItem => updateItem.image === item.image)
                if (!exist) {
                    await this.cloudinaryService.removeFile(item.image)
                }
            })
        }

        return deleted
    }

    async removeProjectProduct(id: string): Promise<ProjectProduct> {
        return await this.projectProductModel.findByIdAndDelete(id)
    }

}
