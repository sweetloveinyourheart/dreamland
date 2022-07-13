import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose'
import { RealEstateService } from 'src/real-estate/real-estate.service';
import { CreateTransactionInput } from './dto/create.input';
import { PostStatus } from 'src/real-estate/enum/real-estate.enum';
import { UserPayload } from 'src/auth/decorators/user.decorator';
import { TransactionStatus } from './enums/transaction.enum';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';


@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        private realEstateService: RealEstateService
    ) {}

    async createTransaction(user: UserPayload,item: CreateTransactionInput): Promise<Transaction> {
        try {
            await this.realEstateService.processingTransaction(item, PostStatus.Lock)

            const created = await this.transactionModel.create({
                item,
                user: user.userId,
                createdAt: new Date(),
                status: TransactionStatus.Locked
            })
            await created.save()

            return created
        } catch (error) {
            throw new InternalServerErrorException(err => ({...err, message: 'Create transaction failed!'}))
        }
    }

    async updateTransactionStatus(transactionId: string, status: TransactionStatus): Promise<Transaction> {
        try {
            const transaction = await this.transactionModel.findByIdAndUpdate(transactionId, { status })
            if(status === TransactionStatus.Rejected) {
                await this.realEstateService.processingTransaction(transaction.item, PostStatus.Available)
            }

            if(status === TransactionStatus.DatCoc) {
                await this.realEstateService.processingTransaction(transaction.item, PostStatus.DatCoc)
            }

            if(status === TransactionStatus.BanGiao) {
                await this.realEstateService.processingTransaction(transaction.item, PostStatus.BanGiao)
            }

            return transaction

        } catch (error) {
            throw new InternalServerErrorException(err => ({...err, message: 'Create transaction failed!'}))
        }
    }

    async getAll(status: TransactionStatus, paging: PaginationArgs | undefined): Promise<Transaction[]> {
        try {
            return await this.transactionModel.find({ status }).populate("user").limit(paging?.limit).skip(paging?.cursor).sort({ createdAt: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getUserTransation(user: UserPayload): Promise<Transaction[]> {
        try {
            return await this.transactionModel.find({ user: user.userId }).populate("user")
        } catch (error) {
            throw new NotFoundException()
        }
    }

}
