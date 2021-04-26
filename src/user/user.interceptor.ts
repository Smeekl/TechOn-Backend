import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
       const source = context.switchToHttp().getRequest().body;
        context.switchToHttp().getRequest().body = Object.keys(source).reduce((destination, key) => {
           destination[key.toLowerCase()] = source[key];
           return destination;
       }, {});
        return next.handle().pipe(map(data => data));
    }
}