import { Args, Query, Resolver } from '@nestjs/graphql';
import { RealEstateCategory } from 'src/real-estate/enum/real-estate.enum';
import { ProjectStats, RealEstateStats } from './models/stats.model';
import { StatsService } from './stats.service';

@Resolver()
export class StatsResolver {
  constructor(private readonly statsService: StatsService) { }

  @Query(returns => RealEstateStats)
  async realEstateStats(@Args('category', { type: () => RealEstateCategory }) category: RealEstateCategory) {
    return await this.statsService.realEstateStats(category)
  }

  @Query(returns => ProjectStats)
  async projectStats() {
    return await this.statsService.projectStats()
  }
}
