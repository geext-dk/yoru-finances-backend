import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserModel } from '../users/dtos/user.model'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserModel => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  },
)
