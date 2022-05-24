import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Project } from 'src/project/models/project.model';
import { ProjectService } from 'src/project/project.service';
import { RealEstateCategory } from 'src/real-estate/enum/real-estate.enum';
import { RealEstateService } from 'src/real-estate/real-estate.service';
import { ProjectStats, RealEstateStats } from './models/stats.model';

@Injectable()
export class StatsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private realEstateService: RealEstateService,
        private projectService: ProjectService
    ) { }

    async realEstateStats(category: RealEstateCategory): Promise<RealEstateStats> {
        // Get data from cache
        let apartments: number | undefined = await this.cacheManager.get('apartmentStats')
        let houses: number | undefined = await this.cacheManager.get('houseStats')
        let lands: number | undefined = await this.cacheManager.get('landStats')
        let businessPremises: number | undefined = await this.cacheManager.get('businessPremisesStats')
        let motals: number | undefined = await this.cacheManager.get('motalStats')

        if (apartments === undefined ||
            houses === undefined ||
            lands === undefined ||
            businessPremises === undefined ||
            motals === undefined
        ) {
            const dbData = await this.realEstateService.realEstateStats(category)

            // Update cache
            await this.cacheManager.set('apartmentStats', dbData.apartments, { ttl: 24 * 60 * 60 })
            await this.cacheManager.set('houseStats', dbData.houses, { ttl: 24 * 60 * 60 })
            await this.cacheManager.set('landStats', dbData.lands, { ttl: 24 * 60 * 60 })
            await this.cacheManager.set('businessPremisesStats', dbData.businessPremises, { ttl: 24 * 60 * 60 })
            await this.cacheManager.set('motalStats', dbData.motals, { ttl: 24 * 60 * 60 })

            apartments = dbData.apartments
            houses = dbData.houses
            lands = dbData.lands
            businessPremises = dbData.businessPremises
            motals = dbData.motals
        }

        return {
            apartments,
            houses,
            lands,
            businessPremises,
            motals
        }
    }

    async projectStats(): Promise<ProjectStats> {
        let projects: number | undefined = await this.cacheManager.get('apartmentStats')

        if (projects === undefined) {
            projects = (await this.projectService.projectStats()).projects

            await this.cacheManager.set('projectStats', projects, { ttl: 24 * 60 * 60 })
        }

        return {
            projects
        }
    }
}
