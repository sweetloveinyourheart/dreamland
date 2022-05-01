import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateResolver } from './real-estate.resolver';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Apartment, ApartmentSchema } from './schemas/apartment.schema';
import { House, HouseSchema } from './schemas/house.schema';
import { Land, LandSchema } from './schemas/land.schema';
import { BusinessPremises, BusinessPremisesSchema } from './schemas/business-premises.schema';
import { Motal, MotalSchema } from './schemas/motal.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Apartment.name,
        useFactory: async (connection: any) => {
          const schema = ApartmentSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(require('mongoose-autopopulate'));
          schema.plugin(AutoIncrement, { inc_field: 'apartmentID' }) 
          return schema;
        },
        inject: [getConnectionToken()]
      },
      {
        name: House.name,
        useFactory: async (connection: any) => {
          const schema = HouseSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(require('mongoose-autopopulate'));
          schema.plugin(AutoIncrement, { inc_field: 'houseID' }) 
          return schema;
        },
        inject: [getConnectionToken()]
      },
      {
        name: Land.name,
        useFactory: async (connection: any) => {
          const schema = LandSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(require('mongoose-autopopulate'));
          schema.plugin(AutoIncrement, { inc_field: 'landID' }) 
          return schema;
        },
        inject: [getConnectionToken()]
      },
      {
        name: BusinessPremises.name,
        useFactory: async (connection: any) => {
          const schema = BusinessPremisesSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(require('mongoose-autopopulate'));
          schema.plugin(AutoIncrement, { inc_field: 'businessPremisesID' }) 
          return schema;
        },
        inject: [getConnectionToken()]
      },
      { 
        name: Motal.name, 
        useFactory: async (connection: any) => {
          const schema = MotalSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(require('mongoose-autopopulate'));
          schema.plugin(AutoIncrement, { inc_field: 'motalID' }) 
          return schema;
        },
        inject: [getConnectionToken()]
      }
    ])
  ],
  providers: [RealEstateResolver, RealEstateService]
})
export class RealEstateModule { }
