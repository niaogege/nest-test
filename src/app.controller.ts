import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller({
  path: '/cpp',
  // host: '127.0.0.1',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.userService.findAll();
  }

  @Get('html')
  getAppHtml() {
    return this.appService.getHtml();
  }
  @Get()
  getHellos() {
    return 'Hello World!';
  }
}
