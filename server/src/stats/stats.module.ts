import { CacheModule, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsResolver } from './stats.resolver';
import { RealEstateModule } from 'src/real-estate/real-estate.module';
import { ProjectModule } from 'src/project/project.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store'


@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: 'redis',
        port: 6379
      })
    }),
    RealEstateModule,
    ProjectModule
  ],
  providers: [StatsResolver, StatsService]
})
export class StatsModule { }
