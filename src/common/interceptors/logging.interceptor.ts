import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('LOGGER before...');
    const [req] = context.getArgs();
    console.log(req);
    console.log(`CUR URL: ${req.url}`);
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After now ${Date.now() - now}ms`)));
  }
}
