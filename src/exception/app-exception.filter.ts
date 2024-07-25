import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status;
    let message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof RpcException) {
      const rpcError: any = exception.getError();
      status = rpcError.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      message = rpcError.message || 'Internal server error';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }
    response.status(status).json({
      statusCode: status,
      status: false,
      message:
        typeof message === 'object' && message.hasOwnProperty('message')
          ? (message as any).message
          : message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
