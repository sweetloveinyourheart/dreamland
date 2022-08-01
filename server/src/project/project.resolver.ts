import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { UserRole } from 'src/user/enum/user.enum';
import { CreateProjectInput, CreateProjectProductInput } from './dto/create.input';
import { UpdateStatusInput } from './dto/edit.input';
import { ProjectFilter } from './dto/filter.input';
import { ProjectProduct } from './models/project-product.model';
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

  @Query(returns => [ProjectProduct])
  async getProjectProducts(@Args('project') project: string): Promise<ProjectProduct[]> {
    return await this.projectService.getProjectProducts(project)
  }

  @Query(returns => ProjectProduct)
  async getProjectProductById(@Args('id') id: string): Promise<ProjectProduct> {
    return await this.projectService.getProjectProductById(id)
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

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ProductManager)
  @Mutation(returns => Project)
  async createProject(@Args('data') data: CreateProjectInput) {
    return await this.projectService.createProject(data)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ProductManager)
  @Mutation(returns => ProjectProduct)
  async createProjectProduct(@Args('data') data: CreateProjectProductInput) {
    return await this.projectService.createProjectProduct(data)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ProductManager)
  @Mutation(returns => Project)
  async editProject(
    @Args('id') id: string,
    @Args('data', { nullable: true }) data: CreateProjectInput | null,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput | null
  ) {
    return await this.projectService.editProject(id, data, updateStatus)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ProductManager)
  @Mutation(returns => Project)
  async removeProject(@Args('id') id: string) {
    return await this.projectService.removeProject(id)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ProductManager)
  @Mutation(returns => ProjectProduct)
  async removeProjectProduct(@Args('id') id: string) {
    return await this.projectService.removeProjectProduct(id)
  }

}
