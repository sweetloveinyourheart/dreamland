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
import { RealEstatePosts } from './models/parent-models/top';
import { UpdatePostStatusInput } from './dto/inputs/general/update.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user.enum';
import { AuthenticatedUser, UserPayload } from 'src/auth/decorators/user.decorator';
import { PostStatus } from './enum/real-estate.enum';

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

  @UseGuards(GqlAuthGuard)
  @Query(returns => RealEstatePosts)
  async getUploadedPosts(
    @AuthenticatedUser() user: UserPayload, 
    @Args('status', { type: () => PostStatus }) status: PostStatus
  ): Promise<RealEstatePosts> {
    return await this.realEstateService.getUploadedPosts(user, status)
  }

  @Query(returns => [House])
  async getHouses(
    @Args('filter') filter: HouseFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getHousePosts(filter, paging);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Query(returns => [House])
  async getAllHouses(
    @Args('filter') filter: HouseFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string,
    @Args('pending', { nullable: true, type: () => Boolean }) pending: boolean
  ) {
    return await this.realEstateService.getAllHouses(filter, paging, search, pending);
  }

  @Query(returns => [Apartment])
  async getApartments(
    @Args('filter') filter: ApartmentFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getApartmentPosts(filter, paging);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Query(returns => [Apartment])
  async getAllApartments(
    @Args('filter') filter: ApartmentFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string,
    @Args('pending', { nullable: true, type: () => Boolean }) pending: boolean
  ) {
    return await this.realEstateService.getAllApartments(filter, paging, search, pending);
  }

  @Query(returns => [Land])
  async getLands(
    @Args('filter') filter: LandFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getLandPosts(filter, paging);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Query(returns => [Land])
  async getAllLands(
    @Args('filter') filter: LandFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string,
    @Args('pending', { nullable: true, type: () => Boolean }) pending: boolean
  ) {
    return await this.realEstateService.getAllLands(filter, paging, search, pending);
  }

  @Query(returns => [BusinessPremises])
  async getBusinessPremises(
    @Args('filter') filter: BusinessPremisesFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getBusinessPremisesPosts(filter, paging);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Query(returns => [BusinessPremises])
  async getAllBusinessPremises(
    @Args('filter') filter: BusinessPremisesFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string,
    @Args('pending', { nullable: true, type: () => Boolean }) pending: boolean
  ) {
    return await this.realEstateService.getAllBusinessPremises(filter, paging, search, pending);
  }

  @Query(returns => [Motal])
  async getMotals(
    @Args('filter') filter: MotalFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getMotalPosts(filter, paging);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Query(returns => [Motal])
  async getAllMotals(
    @Args('filter') filter: MotalFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs,
    @Args('search', { nullable: true }) search: string,
    @Args('pending', { nullable: true, type: () => Boolean }) pending: boolean
  ) {
    return await this.realEstateService.getAllMotals(filter, paging, search, pending);
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

  @UseGuards(GqlAuthGuard)
  @Query(returns => Apartment)
  async getApartmentPostById(@Args('id') id: string) {
    return await this.realEstateService.getApartmentPostById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => House)
  async getHousePostById(@Args('id') id: string) {
    return await this.realEstateService.getHousePostById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Land)
  async getLandPostById(@Args('id') id: string) {
    return await this.realEstateService.getLandPostById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => BusinessPremises)
  async getBusinessPremisesPostById(@Args('id') id: string) {
    return await this.realEstateService.getBusinessPremisesPostById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Motal)
  async getMotalPostById(@Args('id') id: string) {
    return await this.realEstateService.getMotalPostById(id);
  }

  //=================================== Mutation ======================================

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => Apartment)
  async createApartmentPost(@Args('data') data: CreateApartmentInput, @AuthenticatedUser() user: UserPayload): Promise<Apartment> {
    return await this.realEstateService.createApartmentPost(data, user);
  }

  @Mutation(returns => House)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  async createHousePost(@Args('data') data: CreateHouseInput, @AuthenticatedUser() user: UserPayload): Promise<House> {
    return await this.realEstateService.createHousePost(data, user);
  }

  @Mutation(returns => Land)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  async createLandPost(@Args('data') data: CreateLandInput, @AuthenticatedUser() user: UserPayload): Promise<Land> {
    return await this.realEstateService.createLandPost(data, user);
  }

  @Mutation(returns => BusinessPremises)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  async createBusinessPremisesPost(@Args('data') data: CreateBusinessPremisesInput, @AuthenticatedUser() user: UserPayload): Promise<BusinessPremises> {
    return await this.realEstateService.createBusinessPremisesPost(data, user);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => Motal)
  async createMotalPost(@Args('data') data: CreateMotalInput, @AuthenticatedUser() user: UserPayload): Promise<Motal> {
    return await this.realEstateService.createMotalPost(data, user);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => Apartment)
  async updateApartmentPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateApartmentInput,
    @Args('status', { nullable: true }) updateStatus: UpdatePostStatusInput,
    @Args('code', { nullable: true }) code: string | undefined
  ): Promise<Apartment> {
    return await this.realEstateService.updateApartmentPost(postId, data, updateStatus, code);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => House)
  async updateHousePost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateHouseInput | null,
    @Args('status', { nullable: true }) updateStatus: UpdatePostStatusInput,
    @Args('code', { nullable: true }) code: string | undefined
  ): Promise<House> {
    return await this.realEstateService.updateHousePost(postId, data, updateStatus, code);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => Land)
  async updateLandPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateLandInput,
    @Args('status', { nullable: true }) updateStatus: UpdatePostStatusInput,
    @Args('code', { nullable: true }) code: string | undefined
  ): Promise<Land> {
    return await this.realEstateService.updateLandPost(postId, data, updateStatus, code);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => BusinessPremises)
  async updateBusinessPremisesPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateBusinessPremisesInput,
    @Args('status', { nullable: true }) updateStatus: UpdatePostStatusInput,
    @Args('code', { nullable: true }) code: string | undefined
  ): Promise<BusinessPremises> {
    return await this.realEstateService.updateBusinessPremisesPost(postId, data, updateStatus, code);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Manager)
  @Mutation(returns => Motal)
  async updateMotalPost(
    @Args('postId') postId: string,
    @Args('data', { nullable: true }) data: CreateMotalInput,
    @Args('status', { nullable: true }) updateStatus: UpdatePostStatusInput,
    @Args('code', { nullable: true }) code: string | undefined
  ): Promise<Motal> {
    return await this.realEstateService.updateMotalPost(postId, data, updateStatus, code);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => Apartment)
  async deleteApartmentPost(
    @Args('postId') postId: string
  ): Promise<Apartment> {
    return await this.realEstateService.deleteApartmentPost(postId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => House)
  async deleteHousePost(
    @Args('postId') postId: string
  ): Promise<House> {
    return await this.realEstateService.deleteHousePost(postId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => Land)
  async deleteLandPost(
    @Args('postId') postId: string
  ): Promise<Land> {
    return await this.realEstateService.deleteLandPost(postId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => BusinessPremises)
  async deleteBusinessPremisesPost(
    @Args('postId') postId: string
  ): Promise<BusinessPremises> {
    return await this.realEstateService.deleteBusinessPremisesPost(postId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => Motal)
  async deleteMotalPost(
    @Args('postId') postId: string
  ): Promise<Motal> {
    return await this.realEstateService.deleteMotalPost(postId);
  }

}
