import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ProjectService } from 'src/project/project.service';
import { RealEstateCategory, StatsTime } from 'src/real-estate/enum/real-estate.enum';
import { RealEstateService } from 'src/real-estate/real-estate.service';
import { ProjectStats, RealEstateStats } from './models/stats.model';
import { Workbook } from 'exceljs'
import * as tmp from 'tmp'
import { join } from 'path';

@Injectable()
export class StatsService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private realEstateService: RealEstateService,
        private projectService: ProjectService
    ) { }

    private async exportExcelFile(data: any) {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Thống kê")

        worksheet.columns = [
            { header: 'STT', key: 'id', width: 10 },
            { header: 'Mã BĐS', key: 'code', width: 20 },
            { header: 'Tên BĐS', key: 'title', width: 64 },
            { header: 'Giá trị', key: 'total_pricing', width: 20 },
            { header: 'Địa chỉ', key: 'address', width: 64 },
            { header: 'Ngày đăng', key: 'time_stamp', width: 20 },
            { header: 'Chủ bài đăng', key: 'owner_name', width: 25 },
            { header: 'Số điện thoại', key: 'owner_phone', width: 25 },
        ];

        data.forEach((value, index) => {
            worksheet.addRow({
                id: index,
                code: value.code,
                title: value.title,
                total_pricing: value.detail.pricing.total,
                address: value.detail.address.province + " - " + value.detail.address.district + " - " + value.detail.address.ward,
                time_stamp: value.timeStamp,
                owner_name: value.owner.name,
                owner_phone: value.owner.phone
            })
        })
        
        const path = join(process.cwd(), 'files' ,'export.xlsx')
        return await workbook.xlsx.writeFile(path)
    }

    async realEstateStats(category: RealEstateCategory, time?: StatsTime): Promise<RealEstateStats> {
        let apartments: number | undefined
        let houses: number | undefined
        let lands: number | undefined
        let businessPremises: number | undefined
        let motals: number | undefined

        // Get data from cache
        if (!time) // if query from client (not include time param), store data in cache
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
            const dbData = await this.realEstateService.realEstateStats(category, time)

            // Update cache
            if (!time) // if query from client (not include time param), store data in cache
                if (category === RealEstateCategory.MuaBan && !time) {
                    await this.cacheManager.set('sellingApartmentStats', dbData.apartments, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('sellingHouseStats', dbData.houses, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('sellingLandStats', dbData.lands, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('sellingBusinessPremisesStats', dbData.businessPremises, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('sellingMotalStats', dbData.motals, { ttl: 1 * 60 * 60 })
                } else {
                    await this.cacheManager.set('rentingApartmentStats', dbData.apartments, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('rentingHouseStats', dbData.houses, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('rentingLandStats', dbData.lands, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('rentingBusinessPremisesStats', dbData.businessPremises, { ttl: 1 * 60 * 60 })
                    await this.cacheManager.set('rentingMotalStats', dbData.motals, { ttl: 1 * 60 * 60 })
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

    async exportRealEstateStat() {
        const data = await this.realEstateService.getStatsExportData()
        return await this.exportExcelFile(data)
    }
}
