import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose'
import { RealEstateService } from 'src/real-estate/real-estate.service';
import { CreateProjectTransaction, CreateRealEstateTransaction } from './dto/create.input';
import { PostStatus } from 'src/real-estate/enum/real-estate.enum';
import { UserPayload } from 'src/auth/decorators/user.decorator';
import { TransactionStatus } from './enums/transaction.enum';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';
import { ProjectProductStatus } from 'src/project/enum/pj.enum';
import { ProjectProduct } from 'src/project/schemas/project-product.schema';


@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
        private realEstateService: RealEstateService,
        private notificationService: NotificationService,
        private userService: UserService,
        private projectService: ProjectService
    ) { }

    private postNameCustomize(name: string) {
        if(name.length > 30) {
            return name.slice(0, 30) + "..."
        } 

        return name
    }

    async createTransaction(
        user: UserPayload,
        realEstate: CreateRealEstateTransaction | undefined,
        project: CreateProjectTransaction | undefined
    ): Promise<Transaction> {
        if (realEstate) {
            await this.realEstateService.processingTransaction(realEstate, PostStatus.Lock)

            const created = await this.transactionModel.create({
                realEstate,
                user: user.userId,
                createdAt: new Date(),
                status: TransactionStatus.Locked
            })
            await created.save()

            return created
        }

        if (project) {
            // Processing and save transaction informations
            await this.projectService.processingTransaction(project, ProjectProductStatus.Lock)

            const created = await this.transactionModel.create({
                project,
                user: user.userId,
                createdAt: new Date(),
                status: TransactionStatus.Locked
            })
            await created.save()

            return created
        }

        throw new BadRequestException()
    }

    async updateTransactionStatus(transactionId: string, status: TransactionStatus): Promise<Transaction> {
        try {
            const transaction = await this.transactionModel.findByIdAndUpdate(transactionId, { status })

            if (transaction.realEstate) {
                let post: any

                if (status === TransactionStatus.Rejected) {
                    post = await this.realEstateService.processingTransaction(transaction.realEstate, PostStatus.Available)
                }

                if (status === TransactionStatus.DatCoc) {
                    post = await this.realEstateService.processingTransaction(transaction.realEstate, PostStatus.DatCoc)
                    // push notification
                    const { device } = await this.userService.findById(transaction.user)
                    if(device)
                        await this.notificationService.pushNotification({ title: 'Trạng thái bất động sản 🏣', body: `Đã xác nhận giao dịch với "${this.postNameCustomize(post.title)}"` }, device)
                }

                if (status === TransactionStatus.BanGiao) {
                    post = await this.realEstateService.processingTransaction(transaction.realEstate, PostStatus.BanGiao)
                    // global push notification
                    await this.notificationService.globalPush({ title: 'Giao dịch thành công 🏣', body: `Chúc mừng bất động sản "${this.postNameCustomize(post.title)}" đã hoàn tất giao dịch` })
                }
            }

            if (transaction.project) {
                // do push notification
                let product: ProjectProduct

                if (status === TransactionStatus.Rejected) {
                    product = await this.projectService.processingTransaction(transaction.project, ProjectProductStatus.Available)
                }

                if (status === TransactionStatus.DatCoc) {
                    product = await this.projectService.processingTransaction(transaction.project, ProjectProductStatus.DatCoc)
                    // push notification
                    const { device } = await this.userService.findById(transaction.user)
                    if(device)
                        await this.notificationService.pushNotification({ title: `Trạng thái bất động sản 🏣`, body: `Đã xác nhận giao dịch với sản phẩm mã ${product.code}` }, device)
                }

                if (status === TransactionStatus.BanGiao) {
                    product = await this.projectService.processingTransaction(transaction.project, ProjectProductStatus.BanGiao)
                    // global push notification
                    await this.notificationService.globalPush({ title: `Giao dịch thành công 🏣`, body: `Chúc mừng sản phẩm mã ${product.code} đã được giao dịch thành công` })
                }
            }

            return transaction

        } catch (error) {
            throw new InternalServerErrorException('Update transaction failed!')
        }
    }

    async getAll(status: TransactionStatus, paging: PaginationArgs | undefined): Promise<Transaction[]> {
        try {
            return await this.transactionModel.find({ status }).populate("user").limit(paging?.limit).skip(paging?.cursor).sort({ createdAt: -1 })
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getUserTransation(user: UserPayload, status: TransactionStatus): Promise<Transaction[]> {
        try {
            return await this.transactionModel.find({ user: user.userId, status }).populate("user")
        } catch (error) {
            throw new NotFoundException()
        }
    }

}
