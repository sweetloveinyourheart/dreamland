import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { UserModule } from 'src/user/user.module';
import { RealEstateModule } from 'src/real-estate/real-estate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    UserModule,
    RealEstateModule,
    MongooseModule.forFeature([{ name: Transaction.name, schema: transactionSchema }])
  ],
  providers: [TransactionResolver, TransactionService]
})
export class TransactionModule { }
