import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
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
        try {
            let apartments: number | undefined
            let houses: number | undefined
            let lands: number | undefined
            let businessPremises: number | undefined
            let motals: number | undefined

            // Get data from cache
            if (category === RealEstateCategory.MuaBan) {
                apartments = await this.cacheManager.get('sellingApartmentStats')
                houses = await this.cacheManager.get('sellingHouseStats')
                lands = await this.cacheManager.get('sellingLandStats')
                businessPremises = await this.cacheManager.get('sellingBusinessPremisesStats')
                motals = await this.cacheManager.get('sellingMotalStats')
            } else {
                apartments = await this.cacheManager.get('rentingApartmentStats')
                houses = await this.cacheManager.get('rentingHouseStats')
                lands = await this.cacheManager.get('rentingLandStats')
                businessPremises = await this.cacheManager.get('rentingBusinessPremisesStats')
                motals = await this.cacheManager.get('rentingMotalStats')
            }


            if (apartments === undefined ||
                houses === undefined ||
                lands === undefined ||
                businessPremises === undefined ||
                motals === undefined
            ) {
                const dbData = await this.realEstateService.realEstateStats(category)

                // Update cache
                if (category === RealEstateCategory.MuaBan) {
                    await this.cacheManager.set('sellingApartmentStats', dbData.apartments, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('sellingHouseStats', dbData.houses, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('sellingLandStats', dbData.lands, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('sellingBusinessPremisesStats', dbData.businessPremises, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('sellingMotalStats', dbData.motals, { ttl: 24 * 60 * 60 })
                } else {
                    await this.cacheManager.set('rentingApartmentStats', dbData.apartments, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('rentingHouseStats', dbData.houses, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('rentingLandStats', dbData.lands, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('rentingBusinessPremisesStats', dbData.businessPremises, { ttl: 24 * 60 * 60 })
                    await this.cacheManager.set('rentingMotalStats', dbData.motals, { ttl: 24 * 60 * 60 })
                }

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
        } catch (error) {
            console.log(error);
            
        }
    }

    async projectStats(): Promise<ProjectStats> {
        let projects: number | undefined = await this.cacheManager.get('projectStats')

        if (projects === undefined) {
            projects = (await this.projectService.projectStats()).projects

            await this.cacheManager.set('projectStats', projects, { ttl: 24 * 60 * 60 })
        }

        return {
            projects
        }
    }
}
