import { Test, TestingModule } from '@nestjs/testing';
import { PageTemplateService } from './page-template.service';

describe('PageTemplateService', () => {
  let service: PageTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageTemplateService],
    }).compile();

    service = module.get<PageTemplateService>(PageTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
