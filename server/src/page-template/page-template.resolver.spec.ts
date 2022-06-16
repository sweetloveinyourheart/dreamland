import { Test, TestingModule } from '@nestjs/testing';
import { PageTemplateResolver } from './page-template.resolver';
import { PageTemplateService } from './page-template.service';

describe('PageTemplateResolver', () => {
  let resolver: PageTemplateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageTemplateResolver, PageTemplateService],
    }).compile();

    resolver = module.get<PageTemplateResolver>(PageTemplateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
