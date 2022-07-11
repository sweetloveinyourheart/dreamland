import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog as BlogModel, BlogDocument } from './schemas/blog.schema';
import { Model } from "mongoose"
import { Blog } from './models/blog.model';
import { CreateBlogInput } from './dto/create.input';
import { nonAccentVietnamese } from 'src/project/utils/vietnamese-accent';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(BlogModel.name) private blogModel: Model<BlogDocument>,
        private cloudinaryService: CloudinaryService
    ) { }

    async createBlog(data: CreateBlogInput): Promise<Blog> {
        try {
            const newBlog = await this.blogModel.create({
                ...data,
                timeStamp: new Date(),
                link: nonAccentVietnamese(data.title).replace(/\s|\/|\?/g, "-")
            })
            return await newBlog.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async getBlogByLink(link: string): Promise<Blog> {
        try {
            return await this.blogModel.findOne({ link })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getBlogs(): Promise<Blog[]> {
        try {
            return await this.blogModel.find().sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async removeBlog(blogId: string): Promise<Blog> {
        try {
            const removed = await this.blogModel.findByIdAndDelete(blogId)

            await this.cloudinaryService.removeFile(removed.image)

            return removed
        } catch (error) {
            throw new NotFoundException()
        }
    }
}
