import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: blogSchema }
    ])
  ],
  providers: [BlogResolver, BlogService]
})
export class BlogModule {}
