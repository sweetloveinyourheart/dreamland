import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        let request = ctx.getContext()
        const strategyBody = {
            username: ctx.getArgs().account.phone,
            password: ctx.getArgs().account.password
        }
        request.body = strategyBody
        
        return request;
    }
}