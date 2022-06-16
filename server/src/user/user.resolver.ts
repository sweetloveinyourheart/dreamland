import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UserRole } from './enum/user.enum';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Mutation(returns => User)
  async createNewUser(
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    return this.userService.createUser(data)
  }


}
