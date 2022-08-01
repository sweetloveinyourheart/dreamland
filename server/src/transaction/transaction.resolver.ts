import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedUser, UserPayload } from 'src/auth/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginationArgs } from 'src/real-estate/dto/inputs/general/paging.input';
import { UserRole } from 'src/user/enum/user.enum';
import { CreateRealEstateTransaction, CreateProjectTransaction } from './dto/create.input';
import { TransactionStatus } from './enums/transaction.enum';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './transaction.service';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.TransactionManager)
  @Query(returns => [Transaction])
  async getAllTransaction(
    @Args('status', { type: () => TransactionStatus }) status: TransactionStatus,
    @Args('paging', { nullable: true }) paging: PaginationArgs | undefined
  ): Promise<Transaction[]> {
    return await this.transactionService.getAll(status, paging)
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Transaction])
  async getUserTransaction(
    @AuthenticatedUser() user: UserPayload,
    @Args('status', { type: () => TransactionStatus }) status: TransactionStatus,
  ): Promise<Transaction[]> {
    return await this.transactionService.getUserTransation(user, status)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Transaction)
  async newTransaction(
    @AuthenticatedUser() user: UserPayload, 
    @Args('realEstate', { nullable: true }) realEstate: CreateRealEstateTransaction,
    @Args('project', { nullable: true }) project: CreateProjectTransaction,
  ): Promise<Transaction> {
    return await this.transactionService.createTransaction(user, realEstate, project)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.TransactionManager)
  @Mutation(returns => Transaction)
  async updateTransaction(
    @Args('id') id: string,
    @Args('status', { type: () => TransactionStatus }) status: TransactionStatus
  ): Promise<Transaction> {
    return await this.transactionService.updateTransactionStatus(id, status)
  }

}
