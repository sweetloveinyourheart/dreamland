import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { CreateProjectInput } from './dto/create.input';
import { ProjectFilter } from './dto/filter.input';
import { Project } from './models/project.model';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(returns => [Project])
  async getProjects(
    @Args('filter',  { nullable: true }) filter?: ProjectFilter,
    @Args('paging', { nullable: true }) paging?: PaginationArgs
  ): Promise<Project[]> {
    return await this.projectService.getProjects(filter, paging)
  }

  @Query(returns => Project)
  async getProjectByDirectLink(@Args("directLink") link: string): Promise<Project> {
    return await this.projectService.getProjectByDirectLink(link)
  }

  @Mutation(returns => Project)
  async createProject(@Args('data') data: CreateProjectInput) {
    return await this.projectService.createProject(data)
  }
}
