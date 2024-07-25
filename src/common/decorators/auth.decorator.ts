import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //return request?.auth;
    return {
      id: request?.auth?.id,
      email: request?.auth?.email,
      iat: request?.auth?.iat,
      exp: request?.auth?.exp
    }
  },
);