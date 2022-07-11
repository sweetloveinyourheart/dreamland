import { Module } from '@nestjs/common';
import { PageTemplateService } from './page-template.service';
import { PageTemplateResolver } from './page-template.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PageTemplate, templateSchema } from './schemas/template.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageTemplate.name, schema: templateSchema }
    ]),
    CloudinaryModule
  ],
  providers: [PageTemplateResolver, PageTemplateService]
})
export class PageTemplateModule {}
