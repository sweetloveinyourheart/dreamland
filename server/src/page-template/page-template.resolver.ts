import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateTemplateInput } from './dto/update.input';
import { PageTemplate } from './models/template.model';
import { PageTemplateService } from './page-template.service';

@Resolver()
export class PageTemplateResolver {
  constructor(private readonly pageTemplateService: PageTemplateService) { }

  @Query(returns => PageTemplate, { nullable: true })
  async getTemplate(@Args("pageName") pageName: string) {
    return await this.pageTemplateService.getTemplate(pageName)
  }

  @Mutation(returns => PageTemplate)
  async updatePageTemplate(
    @Args("pageName") pageName: string,
    @Args("data") data: UpdateTemplateInput
  ) {
    return await this.pageTemplateService.updateTemplate(pageName, data)
  }

}
