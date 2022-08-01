import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageTemplate as PageTemplateModel, PageTemplateDocument } from './schemas/template.schema';
import { Model } from "mongoose"
import { UpdateTemplateInput } from './dto/update.input';
import { PageTemplate } from './models/template.model';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PageTemplateService {
    constructor(
        @InjectModel(PageTemplateModel.name) private templageModel: Model<PageTemplateDocument>,
        private cloudinaryService: CloudinaryService
    ) { }

    async getTemplate(pageName): Promise<PageTemplate> {
        try {
            return await this.templageModel.findOne({ pageName })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async updateTemplate(pageName: string, data: UpdateTemplateInput): Promise<PageTemplate> {
        try {
            const isExist = await this.templageModel.findOne({ pageName })
            if (!isExist) {
                const newTemplate = await this.templageModel.create({
                    pageName,
                    ...data
                })
                return await newTemplate.save()
            }

            const updated = await this.templageModel.findOneAndUpdate({ pageName }, data)

            await this.cloudinaryService.removeFile(updated.banner.imgUrl)

            return updated

        } catch (error) {
            throw new NotFoundException()
        }
    }
}
