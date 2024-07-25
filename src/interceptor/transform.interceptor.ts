import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const responseObj = {
          statusCode: data.statusCode,
          status: data?.status || false,
          message: data?.message || 'Success',
        };
        if(data?.data) {
          responseObj['data'] = data.data;
        }
        responseObj['timestamp'] = new Date().toISOString();
        responseObj['path'] = request.url;
        return responseObj;
      }),
    );
  }
}
