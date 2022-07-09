import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticatedUser } from './decorators/user.decorator';
import { LoginInput } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { AccessToken, Login } from './models/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(returns => Login)
  @UseGuards(LocalAuthGuard)
  async login(@Args('account') account: LoginInput, @Context() context) { 
    return await this.authService.login(context.user)
  }

  @Query(returns => Login)
  @UseGuards(LocalAuthGuard)
  async admin(@Args('account') account: LoginInput, @Context() context) { 
    return await this.authService.adminLogin(context.user)
  }

  @Query(returns => AccessToken)
  async refreshToken(
    @Args('refreshToken') token: string
  ): Promise<AccessToken> {
    return await this.authService.refreshToken(token)
  }
}
