import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { CreateProjectInput } from './dto/create.input';
import { UpdateStatusInput } from './dto/edit.input';
import { ProjectFilter } from './dto/filter.input';
import { Project } from './models/project.model';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) { }

  @Query(returns => [Project])
  async getProjects(
    @Args('filter', { nullable: true }) filter?: ProjectFilter,
    @Args('paging', { nullable: true }) paging?: PaginationArgs ,
    @Args('search', { nullable: true }) search?: string
  ): Promise<Project[]> {
    return await this.projectService.getProjects(filter, paging, search)
  }

  @Query(returns => [Project])
  async getAllProjects(): Promise<Project[]> {
    return await this.projectService.getAllProjects()
  }

  @Query(returns => [Project])
  async getOutstandingProjects(
    @Args('paging', { nullable: true }) paging?: PaginationArgs
  ): Promise<Project[]> {
    return await this.projectService.getOutstandingProjects(paging)
  }

  @Query(returns => Project)
  async getProjectByDirectLink(@Args("directLink") link: string): Promise<Project> {
    return await this.projectService.getProjectByDirectLink(link)
  }

  @Mutation(returns => Project)
  async createProject(@Args('data') data: CreateProjectInput) {
    return await this.projectService.createProject(data)
  }

  @Mutation(returns => Project)
  async editProject(
    @Args('id') id: string,
    @Args('data', { nullable: true }) data: CreateProjectInput | null,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput | null
  ) {
    return await this.projectService.editProject(id, data, updateStatus)
  }
}
