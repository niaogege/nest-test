import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import LoggingInterceptor from 'src/common/interceptors/logging.interceptor';
import TransformInterceptor from 'src/common/interceptors/transform.interceptor';
import ErrorInterceptor from 'src/common/interceptors/exception.interceptor';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // 请求拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());
  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 异常响应拦截器
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(80);
}
bootstrap();
