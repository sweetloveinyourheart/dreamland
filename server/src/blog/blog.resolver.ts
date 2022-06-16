import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create.input';
import { Blog } from './models/blog.model';

@Resolver()
export class BlogResolver {
  constructor(private readonly blogService: BlogService) { }

  @Mutation(() => Blog)
  async createBlog(@Args('data') data: CreateBlogInput): Promise<Blog> {
    return await this.blogService.createBlog(data)
  }

  @Query(returns => [Blog])
  async getBlogs(): Promise<Blog[]> {
    return await this.blogService.getBlogs()
  }

  @Query(returns => Blog)
  async getBlogByLink(@Args('link') link: string): Promise<Blog> {
    return await this.blogService.getBlogByLink(link)
  }

  @Mutation(returns => Blog)
  async removeBlog(@Args('blogId') blogId: string): Promise<Blog> {
    return await this.blogService.removeBlog(blogId)
  }
}
