import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsResolver } from './stats.resolver';
import { RealEstateModule } from 'src/real-estate/real-estate.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    RealEstateModule,
    ProjectModule
  ],
  providers: [StatsResolver, StatsService]
})
export class StatsModule {}
