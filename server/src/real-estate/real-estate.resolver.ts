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

@Resolver()
export class RealEstateResolver {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Query(returns => [House])
  async getHouses(
    @Args('filter') filter: HouseFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return await this.realEstateService.getHousePosts(filter, paging);
  }

  @Query(returns => [Apartment])
  getApartments(
    @Args('filter') filter: ApartmentFilter,
    @Args('paging', { nullable: true }) paging: PaginationArgs
  ) {
    return;
  }

  @Query(returns => [Land])
  getLands() {
    return;
  }

  @Query(returns => [BusinessPremises])
  getBusinessPremises() {
    return;
  }

  @Mutation(returns => Apartment)
  async createApartmentPost(@Args('data') data: CreateApartmentInput): Promise<Apartment> {
    return await this.realEstateService.createApartmentPost(data);
  }

  @Mutation(returns => House)
  async createHousePost(@Args('data') data: CreateHouseInput): Promise<House> {
    return await this.realEstateService.createHousePost(data);
  }

}
