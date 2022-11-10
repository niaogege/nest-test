import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  path: '/cpp',
  host: '127.0.0.1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getAppHtml() {
    return this.appService.getHtml();
  }
}
