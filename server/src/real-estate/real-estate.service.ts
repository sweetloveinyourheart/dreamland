import { BadRequestException, CACHE_MANAGER, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
import { PostStatus, RealEstateCategory, RealEstateType, StatsTime } from './enum/real-estate.enum';
import { RealEstateStats } from 'src/stats/models/stats.model';
import { Cache } from 'cache-manager';
import { RealEstatePosts } from './models/parent-models/top';
import { RealEstateFilter } from './dto/inputs/general/filter.input';
import { UpdatePostStatusInput } from './dto/inputs/general/update.input';
import { UserPayload } from 'src/auth/decorators/user.decorator';
import { UserRole } from 'src/user/enum/user.enum';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateRealEstateTransaction } from 'src/transaction/dto/create.input';

@Injectable()
export class RealEstateService {
    constructor(
        @InjectModel(ApartmentModel.name) private apartmentModel: Model<ApartmentDocument>,
        @InjectModel(HouseModel.name) private houseModel: Model<HouseDocument>,
        @InjectModel(LandModel.name) private landModel: Model<LandDocument>,
        @InjectModel(BusinessPremisesModel.name) private businessPremisesModel: Model<BusinessPremisesDocument>,
        @InjectModel(MotalModel.name) private motalModel: Model<MotalDocument>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private cloudinaryService: CloudinaryService
    ) { }

    async createApartmentPost(data: CreateApartmentInput, user: UserPayload): Promise<Apartment> {
        try {
            const newItem = await this.apartmentModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?|\,|\%|\*|\@|\!|\#|\$|\^|\&|\(|\)/g, "-"),
                index: await this.apartmentModel.countDocuments({ category: data.category }) + 1,
                postStatus: user.roles.find(role => role === UserRole.Admin) ? PostStatus.Available : PostStatus.Pending,
                owner: user.userId
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

    async createHousePost(data: CreateHouseInput, user: UserPayload): Promise<House> {
        try {
            const newItem = await this.houseModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?|\,|\%|\*|\@|\!|\#|\$|\^|\&|\(|\)/g, "-"),
                index: await this.houseModel.countDocuments({ category: data.category }) + 1,
                postStatus: user.roles.find(role => role === UserRole.Admin) ? PostStatus.Available : PostStatus.Pending,
                owner: user.userId
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

    async createLandPost(data: CreateLandInput, user: UserPayload): Promise<Land> {
        try {
            const newItem = await this.landModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?|\,|\%|\*|\@|\!|\#|\$|\^|\&|\(|\)/g, "-"),
                index: await this.landModel.countDocuments({ category: data.category }) + 1,
                postStatus: user.roles.find(role => role === UserRole.Admin) ? PostStatus.Available : PostStatus.Pending,
                owner: user.userId
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

    async createBusinessPremisesPost(data: CreateBusinessPremisesInput, user: UserPayload): Promise<BusinessPremises> {
        try {
            const newItem = await this.businessPremisesModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?|\,|\%|\*|\@|\!|\#|\$|\^|\&|\(|\)/g, "-"),
                index: await this.businessPremisesModel.countDocuments({ category: data.category }) + 1,
                postStatus: user.roles.find(role => role === UserRole.Admin) ? PostStatus.Available : PostStatus.Pending,
                owner: user.userId
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

    async createMotalPost(data: CreateMotalInput, user: UserPayload): Promise<Motal> {
        try {
            const newItem = await this.motalModel.create({
                ...data,
                timeStamp: new Date(),
                directLink: nonAccentVietnamese(data.title + " " + data.detail.address.province + " " + data.detail.address.district).replace(/\s|\/|\?|\,|\%|\*|\@|\!|\#|\$|\^|\&|\(|\)/g, "-"),
                index: await this.motalModel.countDocuments({ category: data.category }) + 1,
                postStatus: user.roles.find(role => role === UserRole.Admin) ? PostStatus.Available : PostStatus.Pending,
                owner: user.userId
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

    async updateApartmentPost(postId: string, data: CreateApartmentInput | null, updateStatus: UpdatePostStatusInput | null, code: string | undefined): Promise<Apartment> {
        try {
            const updated = await this.apartmentModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus,
                code
            })

            if (data)
                updated.media.images.forEach(async (image) => {
                    const exist = data.media.images.find(img => img === image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(image)
                    }
                })

            return updated
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateHousePost(postId: string, data: CreateHouseInput | null, updateStatus: UpdatePostStatusInput | null, code: string | undefined): Promise<House> {
        try {
            const updated = await this.houseModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus,
                code
            })

            if (data)
                updated.media.images.forEach(async (image) => {
                    const exist = data.media.images.find(img => img === image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(image)
                    }
                })

            return updated

        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateLandPost(postId: string, data: CreateLandInput | null, updateStatus: UpdatePostStatusInput | null, code: string | undefined): Promise<Land> {
        try {
            const updated = await this.landModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus,
                code
            })

            if (data)
                updated.media.images.forEach(async (image) => {
                    const exist = data.media.images.find(img => img === image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(image)
                    }
                })

            return updated
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateBusinessPremisesPost(postId: string, data: CreateBusinessPremisesInput | null, updateStatus: UpdatePostStatusInput | null, code: string | undefined): Promise<BusinessPremises> {
        try {
            const updated = await this.businessPremisesModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus,
                code
            })

            if (data)
                updated.media.images.forEach(async (image) => {
                    const exist = data.media.images.find(img => img === image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(image)
                    }
                })

            return updated
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async updateMotalPost(postId: string, data: CreateMotalInput | null, updateStatus: UpdatePostStatusInput | null, code: string | undefined): Promise<Motal> {
        try {
            const updated = await this.motalModel.findByIdAndUpdate(postId, {
                ...data,
                ...updateStatus,
                code
            })

            if (data)
                updated.media.images.forEach(async (image) => {
                    const exist = data.media.images.find(img => img === image)
                    if (!exist) {
                        await this.cloudinaryService.removeFile(image)
                    }
                })

            return updated
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async deleteApartmentPost(postId: string): Promise<Apartment> {
        try {
            const deleted = await this.apartmentModel.findByIdAndDelete(postId)
            deleted.media.images.forEach(async (image) => {
                try {
                    await this.cloudinaryService.removeFile(image)
                } catch (error) {
                    return;
                }
            })

            return deleted
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async deleteHousePost(postId: string): Promise<House> {
        try {
            const deleted = await this.houseModel.findByIdAndDelete(postId)
            deleted.media.images.forEach(async (image) => {
                try {
                    await this.cloudinaryService.removeFile(image)
                } catch (error) {
                    return;
                }
            })
            return deleted
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async deleteLandPost(postId: string): Promise<Land> {
        try {
            const deleted = await this.landModel.findByIdAndDelete(postId)
            deleted.media.images.forEach(async (image) => {
                try {
                    await this.cloudinaryService.removeFile(image)
                } catch (error) {
                    return;
                }
            })
            return deleted
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async deleteBusinessPremisesPost(postId: string): Promise<BusinessPremises> {
        try {
            const deleted = await this.businessPremisesModel.findByIdAndDelete(postId)
            deleted.media.images.forEach(async (image) => {
                try {
                    await this.cloudinaryService.removeFile(image)
                } catch (error) {
                    return;
                }
            })
            return deleted
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async deleteMotalPost(postId: string): Promise<Motal> {
        try {
            const deleted = await this.motalModel.findByIdAndDelete(postId)
            deleted.media.images.forEach(async (image) => {
                try {
                    await this.cloudinaryService.removeFile(image)
                } catch (error) {
                    return;
                }
            })
            return deleted
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
                ...(filter?.balconyDirection && { "overview.balconyDirection": filter.balconyDirection })
            }

            return await this.apartmentModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllApartments(filter: ApartmentFilter, paging: PaginationArgs | undefined, search: string | undefined, pending: boolean): Promise<Apartment[]> {
        try {
            let searchQuery = undefined
            if (search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } }),
                ...(pending ? { postStatus: PostStatus.Pending } : { postStatus: { $ne: PostStatus.Pending } })
            }

            return await this.apartmentModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }).populate('owner')
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
                ...(filter?.frontispiece && { "overview.frontispiece": filter.frontispiece })
            }

            return await this.houseModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllHouses(filter: HouseFilter, paging: PaginationArgs | undefined, search: string | undefined, pending: boolean): Promise<House[]> {
        try {
            let searchQuery = undefined
            if (search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } }),
                ...(pending ? { postStatus: PostStatus.Pending } : { postStatus: { $ne: PostStatus.Pending } })
            }

            return await this.houseModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }).populate('owner')
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
                ...(filter?.frontispiece && { "overview.frontispiece": filter.frontispiece })
            }

            return await this.landModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllLands(filter: LandFilter, paging: PaginationArgs | undefined, search: string | undefined, pending: boolean): Promise<Land[]> {
        try {
            let searchQuery = undefined
            if (search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } }),
                ...(pending ? { postStatus: PostStatus.Pending } : { postStatus: { $ne: PostStatus.Pending } })
            }

            return await this.landModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }).populate('owner')
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
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments })
            }

            return await this.businessPremisesModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllBusinessPremises(filter: BusinessPremisesFilter, paging: PaginationArgs | undefined, search: string | undefined, pending: boolean): Promise<BusinessPremisesModel[]> {
        try {
            let searchQuery = undefined
            if (search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } }),
                ...(pending ? { postStatus: PostStatus.Pending } : { postStatus: { $ne: PostStatus.Pending } })
            }

            return await this.businessPremisesModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }).populate('owner')
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

    async getAllMotals(filter: MotalFilter, paging: PaginationArgs | undefined, search: string | undefined, pending: boolean): Promise<Motal[]> {
        try {
            let searchQuery = undefined
            if (search) {
                searchQuery = new RegExp(search, 'ig')
            }

            let query = {
                category: filter.category,
                ...(searchQuery && { title: { $regex: searchQuery } }),
                ...(pending ? { postStatus: PostStatus.Pending } : { postStatus: { $ne: PostStatus.Pending } })
            }

            return await this.motalModel.find(query).skip(paging?.cursor).limit(paging?.limit).sort({ timeStamp: -1 }).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getApartmentPostByLink(directLink: string): Promise<Apartment> {
        try {
            return await this.apartmentModel.findOne({ directLink }).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getApartmentPostById(id: string): Promise<Apartment> {
        try {
            return await this.apartmentModel.findById(id).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getHousePostByLink(directLink: string): Promise<House> {
        try {
            return await this.houseModel.findOne({ directLink }).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getHousePostById(id: string): Promise<House> {
        try {
            return await this.houseModel.findById(id).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getLandPostByLink(directLink: string): Promise<Land> {
        try {
            return await this.landModel.findOne({ directLink }).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getLandPostById(id: string): Promise<Land> {
        try {
            return await this.landModel.findById(id).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getBusinessPremisesPostByLink(directLink: string): Promise<Apartment> {
        try {
            return await this.businessPremisesModel.findOne({ directLink }).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getBusinessPremisesPostById(id: string): Promise<Apartment> {
        try {
            return await this.businessPremisesModel.findById(id).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getMotalPostByLink(directLink: string): Promise<Land> {
        try {
            return await this.motalModel.findOne({ directLink }).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getMotalPostById(id: string): Promise<Land> {
        try {
            return await this.motalModel.findById(id).populate('owner')
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async realEstateStats(category: RealEstateCategory, time?: StatsTime): Promise<RealEstateStats> {
        try {
            const getFirstDayPreviousMonth = () => {
                const date = new Date();
                return new Date(date.getFullYear(), date.getMonth(), 1);
            }

            let countQuery = {
                category,
                postStatus: { $ne: PostStatus.Pending },
                ...((time === StatsTime.Month) && { timeStamp: { $gte: getFirstDayPreviousMonth() } })
            }

            return {
                apartments: await this.apartmentModel.countDocuments(countQuery),
                houses: await this.houseModel.countDocuments(countQuery),
                lands: await this.landModel.countDocuments(countQuery),
                businessPremises: await this.businessPremisesModel.countDocuments(countQuery),
                motals: await this.motalModel.countDocuments(countQuery),
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
            if (search) {
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

    async processingTransaction(item: CreateRealEstateTransaction, status: PostStatus) {
        try {
            switch (item.itemType) {
                case RealEstateType.CanHo:
                    return await this.apartmentModel.findByIdAndUpdate(item.itemId, { postStatus: status, outstanding: false })

                case RealEstateType.NhaO:
                    return await this.houseModel.findByIdAndUpdate(item.itemId, { postStatus: status, outstanding: false })

                case RealEstateType.Dat:
                    return await this.landModel.findByIdAndUpdate(item.itemId, { postStatus: status, outstanding: false })
                    
                case RealEstateType.VanPhong:
                    return await this.businessPremisesModel.findByIdAndUpdate(item.itemId, { postStatus: status, outstanding: false })

                case RealEstateType.PhongTro:
                    return await this.motalModel.findByIdAndUpdate(item.itemId, { postStatus: status, outstanding: false })              

                default:
                    return null;
            }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async getStatsExportData() {
        const getFirstDayPreviousMonth = () => {
            const date = new Date();
            return new Date(date.getFullYear(), date.getMonth(), 1);
        }

        const query = { timeStamp: { $gte: getFirstDayPreviousMonth() } }

        return [
            ... await this.apartmentModel.find(query).populate('owner').sort({ timeStamp: -1 }),
            ... await this.houseModel.find(query).populate('owner').sort({ timeStamp: -1 }),
            ... await this.landModel.find(query).populate('owner').sort({ timeStamp: -1 }),
            ... await this.businessPremisesModel.find(query).populate('owner').sort({ timeStamp: -1 }),
            ... await this.motalModel.find(query).populate('owner').sort({ timeStamp: -1 })
        ]
    }

    async getUploadedPosts(user: UserPayload, status: PostStatus): Promise<RealEstatePosts> {
        try {
            let query = {
                owner: user.userId,
                postStatus: status
            }

            return {
                apartments: await this.apartmentModel.find(query).sort({ timeStamp: -1 }),
                houses: await this.houseModel.find(query).sort({ timeStamp: -1 }),
                lands: await this.landModel.find(query).sort({ timeStamp: -1 }),
                businessPremises: await this.businessPremisesModel.find(query).sort({ timeStamp: -1 }),
                motals: await this.motalModel.find(query).sort({ timeStamp: -1 })
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }
}
