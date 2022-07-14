import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateResolver } from './real-estate.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';
import { House, HouseSchema } from './schemas/house.schema';
import { Land, LandSchema } from './schemas/land.schema';
import { BusinessPremises, BusinessPremisesSchema } from './schemas/business-premises.schema';
import { Motal, MotalSchema } from './schemas/motal.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Apartment.name,
        schema: ApartmentSchema
      },
      {
        name: House.name,
        schema: HouseSchema
      },
      {
        name: Land.name,
        schema: LandSchema
      },
      {
        name: BusinessPremises.name,
        schema: BusinessPremisesSchema
      },
      {
        name: Motal.name,
        schema: MotalSchema
      }
    ]),
    CloudinaryModule
  ],
  providers: [RealEstateResolver, RealEstateService],
  exports: [RealEstateService]
})
export class RealEstateModule { }
