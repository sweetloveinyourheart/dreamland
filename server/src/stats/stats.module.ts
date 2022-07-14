import { CacheModule, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsResolver } from './stats.resolver';
import { RealEstateModule } from 'src/real-estate/real-estate.module';
import * as redisStore from 'cache-manager-redis-store';
import { ProjectModule } from 'src/project/project.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RealEstateModule,
    ProjectModule,
    CacheModule.register({
      store: redisStore,

      // Store-specific configuration:
      host: process.env.REDIS_HOST,
      port: 6379,
    }),
  ],
  providers: [StatsResolver, StatsService]
})
export class StatsModule {}
