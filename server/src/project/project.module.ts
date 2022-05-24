import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Project, projectSchema } from './schemas/project.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Project.name,
        useFactory: (connection: any) => {
          const schema = projectSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, { inc_field: 'index' }) 
          return schema;
        },
        inject: [getConnectionToken()]
      }
    ])
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
