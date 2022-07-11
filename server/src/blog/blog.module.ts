import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schemas/blog.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Blog.name, schema: blogSchema }
    ])
  ],
  providers: [BlogResolver, BlogService]
})
export class BlogModule {}
