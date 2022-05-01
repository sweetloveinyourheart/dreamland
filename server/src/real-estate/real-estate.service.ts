import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs } from './dto/inputs/general/paging.input';
import { ApartmentFilter, CreateApartmentInput } from './dto/inputs/apartment.input';
import { CreateHouseInput, HouseFilter } from './dto/inputs/house.input';
import { Apartment } from './models/apartment.model';
import { House } from './models/house.model';
import { Apartment as ApartmentModel, ApartmentDocument } from './schemas/apartment.schema';
import { House as HouseModel, HouseDocument } from './schemas/house.schema';

@Injectable()
export class RealEstateService {
    constructor(
        @InjectModel(ApartmentModel.name) private apartmentSchema: Model<ApartmentDocument>,
        @InjectModel(HouseModel.name) private houseSchema: Model<HouseDocument>,
    ) { }

    async createApartmentPost(data: CreateApartmentInput): Promise<Apartment> {
        try {
            const newItem = await this.apartmentSchema.create({
                ...data,
                timeStamp: new Date()
            })

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async createHousePost(data: CreateHouseInput): Promise<House> {
        try {
            const newItem = await this.houseSchema.create({
                ...data,
                timeStamp: new Date()
            })

            return await newItem.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async getApartmentPosts(filter: ApartmentFilter, paging: PaginationArgs) {
        try {
            let query = {
                category: filter.category,
                ...(paging.cursor && { apartmentID: { $gte: paging.cursor } }),
                ...(filter.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.type && { "overview.type": filter.type }),
                ...(filter?.furniture && { "overview.furniture": filter.furniture }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.numberOfBedrooms && { "overview.numberOfBedrooms": filter.numberOfBedrooms }),
                ...(filter.balconyDirection && { "overview.balconyDirection": filter.balconyDirection })
            }

            return await this.apartmentSchema.find(query).limit(paging.limit)
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getHousePosts(filter: HouseFilter, paging: PaginationArgs) {
        try {
            let query = {
                category: filter.category,
                ...(paging.cursor && { apartmentID: { $gte: paging.cursor } }),
                ...(filter.price?.max && { "detail.pricing.total": { $gte: filter.price.min, $lte: filter.price.max } }),
                ...(filter.acreage?.max && { "detail.acreage.totalAcreage": { $gte: filter.acreage.min, $lte: filter.acreage.max } }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.address?.district && { "detail.address.district": filter.address.district }),
                ...(filter?.address?.ward && { "detail.address.ward": filter.address.ward }),
                ...(filter?.address?.province && { "detail.address.province": filter.address.province }),
                ...(filter?.type && { "overview.type": filter.type }),
                ...(filter?.furniture && { "overview.furniture": filter.furniture }),
                ...(filter?.doorDirection && { "overview.doorDirection": filter.doorDirection }),
                ...(filter?.legalDocuments && { "overview.legalDocuments": filter.legalDocuments }),
                ...(filter?.numberOfBedrooms && { "overview.numberOfBedrooms": filter.numberOfBedrooms }),
                ...(filter?.noHau && { "overview.noHau": filter.noHau }),
                ...(filter?.carAlley && { "overview.carAlley": filter.carAlley }),
                ...(filter?.frontispiece && { "overview.frontispiece": filter.frontispiece })
            }

            return await this.houseSchema.find(query).limit(paging.limit)
        } catch (error) {
            throw new NotFoundException()
        }
    }

}
