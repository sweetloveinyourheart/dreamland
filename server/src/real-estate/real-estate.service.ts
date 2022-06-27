import { BadRequestException, CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs } from './dto/inputs/general/paging.input';
import { ApartmentFilter, CreateApartmentInput } from './dto/inputs/apartment.input';
import { CreateHouseInput, HouseFilter } from './dto/inputs/house.input';
import { Apartment } from './models/apartment.model';
import { House } from './models/house.model';
import { Apartment as ApartmentModel, ApartmentDocument } from './schemas/apartment.schema';
import { House as HouseModel, HouseDocument } from './schemas/house.schema';
import { Land as LandModel, LandDocument } from './schemas/land.schema';
import { BusinessPremises as BusinessPremisesModel, BusinessPremisesDocument } from './schemas/business-premises.schema';
import { Motal as MotalModel, MotalDocument } from './schemas/motal.schema';
import { Land } from './models/land.model';
import { CreateLandInput, LandFilter } from './dto/inputs/land.input';
import { nonAccentVietnamese } from 'src/project/utils/vietnamese-accent';
import { BusinessPremisesFilter, CreateBusinessPremisesInput } from './dto/inputs/business-premises.input';
import { CreateMotalInput, MotalFilter } from './dto/inputs/motal.input';
import { Motal } from './models/motal.model';
import { BusinessPremises } from './models/business-premises.model';
import { PostStatus, RealEstateCategory } from './enum/real-estate.enum';
import { RealEstateStats } from 'src/stats/models/stats.model';
import { Cache } from 'cache-manager';
import { RealEstatePosts } from './models/parent-models/top';
import { RealEstateFilter } from './dto/inputs/general/filter.input';
import { UpdatePostStatusInput } from './dto/inputs/general/update.input';

@Injectable()
export class RealEstateService {
    constructor(
        @InjectModel(ApartmentModel.name) private apartmentModel: Model<ApartmentDocument>,
        @InjectModel(HouseModel.name) private houseModel: Model<HouseDocument>,
        @InjectModel(LandModel.name) private landModel: Model<LandDocument>,
        @InjectModel(BusinessPremisesModel.name) private businessPremisesModel: Model<BusinessPremisesDocument>,
        @InjectModel(MotalModel.name) private motalModel: Model<MotalDocument>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async createApartmentPost(data: CreateApartmentInput): Promise<Apartment> {
        try {
            const newItem = await this.apartmentModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?/g, "-"),
                index: await this.apartmentModel.countDocuments({ category: data.category }) + 1
            })

            // Clear current stats cache
            if (data.category === RealEstateCategory.MuaBan) {
                await this.cacheManager.del('sellingApartmentStats');
            } else {
                await this.cacheManager.del('rentingApartmentStats');
            }

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async createHousePost(data: CreateHouseInput): Promise<House> {
        try {
            const newItem = await this.houseModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?/g, "-"),
                index: await this.houseModel.countDocuments({ category: data.category }) + 1
            })
            // Clear current stats cache
            if (data.category === RealEstateCategory.MuaBan) {
                await this.cacheManager.del('sellingHouseStats');
            } else {
                await this.cacheManager.del('rentingHouseStats');
            }

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async createLandPost(data: CreateLandInput): Promise<Land> {
        try {
            const newItem = await this.landModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?/g, "-"),
                index: await this.landModel.countDocuments({ category: data.category }) + 1
            })

            // Clear current stats cache
            if (data.category === RealEstateCategory.MuaBan) {
                await this.cacheManager.del('sellingLandStats');
            } else {
                await this.cacheManager.del('rentingLandStats');
            }

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async createBusinessPremisesPost(data: CreateBusinessPremisesInput): Promise<BusinessPremises> {
        try {
            const newItem = await this.businessPremisesModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?/g, "-"),
                index: await this.businessPremisesModel.countDocuments({ category: data.category }) + 1
            })
            // Clear current stats cache
            if (data.category === RealEstateCategory.MuaBan) {
                await this.cacheManager.del('sellingBusinessPremisesStats');
            } else {
                await this.cacheManager.del('rentingBusinessPremisesStats');
            }

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async createMotalPost(data: CreateMotalInput): Promise<Motal> {
        try {
            const newItem = await this.motalModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?/g, "-"),
                index: await this.motalModel.countDocuments({ category: data.category }) + 1
            })
            // Clear current stats cache
            if (data.category === RealEstateCategory.MuaBan) {
                await this.cacheManager.del('sellingMotalStats');
            } else {
                await this.cacheManager.del('rentingMotalStats');
            }

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateApartmentPost(postId: string, data: CreateApartmentInput, updateStatus: UpdatePostStatusInput): Promise<Apartment> {
        try {
            return await this.apartmentModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateHousePost(postId: string, data: CreateHouseInput, updateStatus: UpdatePostStatusInput): Promise<House> {
        try {
            return await this.houseModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateLandPost(postId: string, data: CreateLandInput, updateStatus: UpdatePostStatusInput): Promise<Land> {
        try {
            return await this.landModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateBusinessPremisesPost(postId: string, data: CreateBusinessPremisesInput, updateStatus: UpdatePostStatusInput): Promise<BusinessPremises> {
        try {
            return await this.businessPremisesModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateMotalPost(postId: string, data: CreateMotalInput, updateStatus: UpdatePostStatusInput): Promise<Motal> {
        try {
            return await this.motalModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async getApartmentPosts(filter: ApartmentFilter, paging: PaginationArgs | undefined): Promise<Apartment[]> {
        try {
            let query = {
                category: filter.category,
                postStatus: PostStatus.Available,
                // ...(paging?.cursor && { index: { $lte: paging.cursor } }),
                ...(filter?.outstanding && { outstanding: filter.outstanding }),
                ...(filter?.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.type && { "overview.type": filter.type }),
                ...(filter?.furniture && { "overview.furniture": filter.furniture }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.numberOfBedrooms && { "overview.numberOfBedrooms": filter.numberOfBedrooms > 10 ? { $gte: filter.numberOfBedrooms } : filter.numberOfBedrooms }),
                ...(filter?.balconyDirection && { "overview.balconyDirection": filter.balconyDirection }),
                ...(filter?.project && { "detail.project": filter.project })
            }

            return await this.apartmentModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllApartments(filter: ApartmentFilter, paging: PaginationArgs | undefined, search: string | undefined): Promise<Apartment[]> {
        try {
            let searchQuery = undefined
            if(search) {
                searchQuery = new RegExp(search, 'ig')
            }
            
            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } })
            }

            return await this.apartmentModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getHousePosts(filter: HouseFilter, paging: PaginationArgs | undefined): Promise<House[]> {
        try {
            let query = {
                category: filter.category,
                // ...(paging?.cursor && { index: { $lte: paging.cursor } }),
                postStatus: PostStatus.Available,
                ...(filter?.outstanding && { outstanding: filter.outstanding }),
                ...(filter?.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.type && { "overview.type": filter.type }),
                ...(filter?.furniture && { "overview.furniture": filter.furniture }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.numberOfBedrooms && { "overview.numberOfBedrooms": filter.numberOfBedrooms > 10 ? { $gte: filter.numberOfBedrooms } : filter.numberOfBedrooms }),
                ...(filter?.noHau && { "overview.noHau": filter.noHau }),
                ...(filter?.carAlley && { "overview.carAlley": filter.carAlley }),
                ...(filter?.frontispiece && { "overview.frontispiece": filter.frontispiece }),
                ...(filter?.project && { "detail.project": filter.project })
            }

            return await this.houseModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllHouses(filter: HouseFilter, paging: PaginationArgs | undefined, search: string | undefined): Promise<House[]> {
        try {
            let searchQuery = undefined
            if(search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } })
            }

            return await this.houseModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getLandPosts(filter: LandFilter, paging: PaginationArgs | undefined): Promise<Land[]> {
        try {
            let query = {
                category: filter.category,
                postStatus: PostStatus.Available,
                // ...(paging?.cursor && { index: { $lte: paging.cursor } }),
                ...(filter?.outstanding && { outstanding: filter.outstanding }),
                ...(filter?.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.type && { "overview.type": filter.type }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.noHau && { "overview.noHau": filter.noHau }),
                ...(filter?.carAlley && { "overview.carAlley": filter.carAlley }),
                ...(filter?.frontispiece && { "overview.frontispiece": filter.frontispiece }),
                ...(filter?.project && { "detail.project": filter.project })
            }

            return await this.landModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllLands(filter: LandFilter, paging: PaginationArgs | undefined, search: string | undefined): Promise<Land[]> {
        try {
            let searchQuery = undefined
            if(search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } })
            }

            return await this.landModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getBusinessPremisesPosts(filter: BusinessPremisesFilter, paging: PaginationArgs | undefined): Promise<BusinessPremisesModel[]> {
        try {
            let query = {
                category: filter.category,
                postStatus: PostStatus.Available,
                ...(filter?.outstanding && { outstanding: filter.outstanding }),
                // ...(paging?.cursor && { index: { $lte: paging.cursor } }),
                ...(filter?.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.type && { "overview.type": filter.type }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.project && { "detail.project": filter.project })
            }

            return await this.businessPremisesModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllBusinessPremises(filter: BusinessPremisesFilter, paging: PaginationArgs | undefined, search: string | undefined): Promise<BusinessPremisesModel[]> {
        try {
            let searchQuery = undefined
            if(search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } })
            }

            return await this.businessPremisesModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getMotalPosts(filter: MotalFilter, paging: PaginationArgs | undefined): Promise<Motal[]> {
        try {
            let query = {
                category: filter.category,
                postStatus: PostStatus.Available,
                // ...(paging?.cursor && { index: { $lte: paging.cursor } }),
                ...(filter?.outstanding && { outstanding: filter.outstanding }),
                ...(filter?.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.numberOfBedrooms && { "overview.numberOfBedrooms": filter.numberOfBedrooms > 10 ? { $gte: filter.numberOfBedrooms } : filter.numberOfBedrooms })
            }

            return await this.motalModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllMotals(filter: MotalFilter, paging: PaginationArgs | undefined, search: string | undefined): Promise<Motal[]> {
        try {
            let searchQuery = undefined
            if(search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } })
            }

            return await this.motalModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getApartmentPostByLink(directLink: string): Promise<Apartment> {
        try {
            return await this.apartmentModel.findOne({ directLink })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getHousePostByLink(directLink: string): Promise<House> {
        try {
            return await this.houseModel.findOne({ directLink })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getLandPostByLink(directLink: string): Promise<Land> {
        try {
            return await this.landModel.findOne({ directLink })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getBusinessPremisesPostByLink(directLink: string): Promise<Apartment> {
        try {
            return await this.businessPremisesModel.findOne({ directLink })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getMotalPostByLink(directLink: string): Promise<Land> {
        try {
            return await this.motalModel.findOne({ directLink })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async realEstateStats(category: RealEstateCategory): Promise<RealEstateStats> {
        try {
            return {
                apartments: await this.apartmentModel.countDocuments({ category }),
                houses: await this.houseModel.countDocuments({ category }),
                lands: await this.landModel.countDocuments({ category }),
                businessPremises: await this.businessPremisesModel.countDocuments({ category }),
                motals: await this.motalModel.countDocuments({ category }),
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getOutstandingPosts(): Promise<RealEstatePosts> {
        return {
            apartments: await this.apartmentModel.find({ postStatus: PostStatus.Available, outstanding: true }),
            houses: await this.houseModel.find({ postStatus: PostStatus.Available, outstanding: true }),
            lands: await this.landModel.find({ postStatus: PostStatus.Available, outstanding: true }),
            businessPremises: await this.businessPremisesModel.find({ postStatus: PostStatus.Available, outstanding: true }),
            motals: await this.motalModel.find({ postStatus: PostStatus.Available, outstanding: true })
        }
    }

    async getRealEstatePosts(filter: RealEstateFilter, paging: PaginationArgs | undefined, search: string | undefined): Promise<RealEstatePosts> {
        try {
            let searchQuery = undefined
            if(search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                postStatus: PostStatus.Available,
                // ...(paging?.cursor && { index: { $lte: paging.cursor } }),
                ...(filter?.outstanding && { outstanding: filter.outstanding }),
                ...(filter?.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter?.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.project && { "detail.project": filter.project }),
                ...(searchQuery && { title: { $regex: searchQuery } })
            }

            return {
                apartments: await this.apartmentModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }),
                houses: await this.houseModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }),
                lands: await this.landModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }),
                businessPremises: await this.businessPremisesModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }),
                motals: await this.motalModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }
}
