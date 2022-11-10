import { Controller, Get, Req, Post, HttpCode } from '@nestjs/common';
import { Request } from 'express';
@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findAll(@Req() request: Request): string {
    console.log('request', request);
    return 'this action return all Ctas';
  }
}
