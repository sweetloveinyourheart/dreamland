import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { UserModule } from 'src/user/user.module';
import { RealEstateModule } from 'src/real-estate/real-estate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactionSchema } from './schemas/transaction.schema';
import { NotificationModule } from 'src/notification/notification.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    ProjectModule,
    UserModule,
    RealEstateModule,
    MongooseModule.forFeature([{ name: Transaction.name, schema: transactionSchema }]),
    NotificationModule
  ],
  providers: [TransactionResolver, TransactionService]
})
export class TransactionModule { }
