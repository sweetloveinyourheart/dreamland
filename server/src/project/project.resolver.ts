import { Resolver, Query } from '@nestjs/graphql';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(returns => String)
  getProject() {
    return;
  }
}
