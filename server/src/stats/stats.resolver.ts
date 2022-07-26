import { Args, Query, Resolver } from '@nestjs/graphql';
import { RealEstateCategory, StatsTime } from 'src/real-estate/enum/real-estate.enum';
import { ProjectStats, RealEstateStats } from './models/stats.model';
import { StatsService } from './stats.service';

@Resolver()
export class StatsResolver {
  constructor(private readonly statsService: StatsService) { }

  @Query(returns => RealEstateStats)
  async realEstateStats(
    @Args('category', { type: () => RealEstateCategory }) category: RealEstateCategory,
    @Args('time', { type: () => StatsTime, nullable: true }) time?: StatsTime
  ) {
    return await this.statsService.realEstateStats(category, time)
  }

  @Query(returns => ProjectStats)
  async projectStats() {
    return await this.statsService.projectStats()
  }
}
