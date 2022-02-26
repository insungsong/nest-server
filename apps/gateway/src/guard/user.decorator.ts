import { ErrorCode } from '@libs/common/constant/error-code';
import { NestException } from '@libs/common/model/exception.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    switch (context.getType().toString()) {
      case 'http':
        return context.switchToHttp().getRequest().user;
      case 'graphql':
        return GqlExecutionContext.create(context).getContext().req.user;
      default:
        throw new NestException(ErrorCode.ERROR, 7829);
    }
  },
);
