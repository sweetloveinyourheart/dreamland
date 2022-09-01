import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthenticatedUser, UserPayload } from 'src/auth/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRole } from './enum/user.enum';
import { Profile, User, UserListResponse } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Query(returns => UserListResponse)
  async getUsers(
    @Args('paging') paging: FindUserInput
  ): Promise<UserListResponse> {
    return await this.userService.getUsers(paging)
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Profile)
  async getProfile(@AuthenticatedUser() user: UserPayload): Promise<Profile> {
    return await this.userService.getProfile(user)
  }

  @UseGuards(GqlAuthGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => Profile)
  async updateUser(
    @Args('phone') phone: string,
    @Args('data') data: UpdateUserInput
  ): Promise<Profile> {
    return await this.userService.updateUser(phone, data)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => User)
  async createNewUser(
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    return this.userService.createUser(data)
  }


}
