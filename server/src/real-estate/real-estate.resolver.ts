import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RealEstateFilter } from './dto/inputs/general/filter.input';
import { PaginationArgs } from './dto/inputs/general/paging.input';
import { ApartmentFilter, CreateApartmentInput } from './dto/inputs/apartment.input';
import { CreateHouseInput, HouseFilter } from './dto/inputs/house.input';
import { Apartment } from './models/apartment.model';
import { BusinessPremises } from './models/business-premises.model';
import { House } from './models/house.model';
import { Land } from './models/land.model';
import { RealEstateService } from './real-estate.service';
import { CreateLandInput, LandFilter } from './dto/inputs/land.input';
import { Motal } from './models/motal.model';
import { BusinessPremisesFilter, CreateBusinessPremisesInput } from './dto/inputs/business-premises.input';
import { CreateMotalInput, MotalFilter } from './dto/inputs/motal.input';
import { UpdateStatusInput } from 'src/project/dto/edit.input';
import { RealEstatePosts } from './models/parent-models/top';

@Resolver()
export class RealEstateResolver {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Query(returns => RealEstatePosts)
  async getOutstandingPosts(): Promise<RealEstatePosts> {
    return await this.realEstateService.getOutstandingPosts()
  }

  @Query(returns => RealEstatePosts)
  async getRealEstatePosts(
    @Args('filter') filter: RealEstateFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string
  ): Promise<RealEstatePosts> {
    return await this.realEstateService.getRealEstatePosts(filter, paging, search)
  }

  @Query(returns => [House])
  async getHouses(
    @Args('filter') filter: HouseFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getHousePosts(filter, paging);
  }

  @Query(returns => [House])
  async getAllHouses(
    @Args('filter') filter: HouseFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string
  ) {
    return await this.realEstateService.getAllHouses(filter, paging, search);
  }

  @Query(returns => [Apartment])
  async getApartments(
    @Args('filter') filter: ApartmentFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getApartmentPosts(filter, paging);
  }

  @Query(returns => [Apartment])
  async getAllApartments(
    @Args('filter') filter: ApartmentFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string
  ) {
    return await this.realEstateService.getAllApartments(filter, paging, search);
  }

  @Query(returns => [Land])
  async getLands(
    @Args('filter') filter: LandFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getLandPosts(filter, paging);
  }

  @Query(returns => [Land])
  async getAllLands(
    @Args('filter') filter: LandFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string
  ) {
    return await this.realEstateService.getAllLands(filter, paging, search);
  }

  @Query(returns => [BusinessPremises])
  async getBusinessPremises(
    @Args('filter') filter: BusinessPremisesFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getBusinessPremisesPosts(filter, paging);
  }

  @Query(returns => [BusinessPremises])
  async getAllBusinessPremises(
    @Args('filter') filter: BusinessPremisesFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string
  ) {
    return await this.realEstateService.getAllBusinessPremises(filter, paging, search);
  }

  @Query(returns => [Motal])
  async getMotals(
    @Args('filter') filter: MotalFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getMotalPosts(filter, paging);
  }

  @Query(returns => [Motal])
  async getAllMotals(
    @Args('filter') filter: MotalFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string
  ) {
    return await this.realEstateService.getAllMotals(filter, paging, search);
  }

  @Query(returns => Apartment)
  async getApartmentPostByLink(@Args('link') link: string) {
    return await this.realEstateService.getApartmentPostByLink(link);
  }

  @Query(returns => House)
  async getHousePostByLink(@Args('link') link: string) {
    return await this.realEstateService.getHousePostByLink(link);
  }

  @Query(returns => Land)
  async getLandPostByLink(@Args('link') link: string) {
    return await this.realEstateService.getLandPostByLink(link);
  }

  @Query(returns => BusinessPremises)
  async getBusinessPremisesPostByLink(@Args('link') link: string) {
    return await this.realEstateService.getBusinessPremisesPostByLink(link);
  }

  @Query(returns => Motal)
  async getMotalPostByLink(@Args('link') link: string) {
    return await this.realEstateService.getMotalPostByLink(link);
  }

  @Mutation(returns => Apartment)
  async createApartmentPost(@Args('data') data: CreateApartmentInput): Promise<Apartment> {
    return await this.realEstateService.createApartmentPost(data);
  }

  @Mutation(returns => House)
  async createHousePost(@Args('data') data: CreateHouseInput): Promise<House> {
    return await this.realEstateService.createHousePost(data);
  }

  @Mutation(returns => Land)
  async createLandPost(@Args('data') data: CreateLandInput): Promise<Land> {
    return await this.realEstateService.createLandPost(data);
  }

  @Mutation(returns => BusinessPremises)
  async createBusinessPremisesPost(@Args('data') data: CreateBusinessPremisesInput): Promise<BusinessPremises> {
    return await this.realEstateService.createBusinessPremisesPost(data);
  }

  @Mutation(returns => Motal)
  async createMotalPost(@Args('data') data: CreateMotalInput): Promise<Motal> {
    return await this.realEstateService.createMotalPost(data);
  }

  @Mutation(returns => Apartment)
  async updateApartmentPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateApartmentInput,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput
  ): Promise<Apartment> {
    return await this.realEstateService.updateApartmentPost(postId, data, updateStatus);
  }

  @Mutation(returns => House)
  async updateHousePost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateHouseInput,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput
  ): Promise<House> {
    return await this.realEstateService.updateHousePost(postId, data, updateStatus);
  }

  @Mutation(returns => Land)
  async updateLandPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateLandInput,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput
  ): Promise<Land> {
    return await this.realEstateService.updateLandPost(postId, data, updateStatus);
  }

  @Mutation(returns => BusinessPremises)
  async updateBusinessPremisesPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateBusinessPremisesInput,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput
  ): Promise<BusinessPremises> {
    return await this.realEstateService.updateBusinessPremisesPost(postId, data, updateStatus);
  }

  @Mutation(returns => Motal)
  async updateMotalPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateMotalInput,
    @Args('status', { nullable: true }) updateStatus: UpdateStatusInput
  ): Promise<Motal> {
    return await this.realEstateService.updateMotalPost(postId, data, updateStatus);
  }

}
