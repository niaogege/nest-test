import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interaces/cat.interface';
import { CreateCtatsDto } from './dto/create-cat.dto';
import { UserService } from '../user/user.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private readonly userService: UserService,
  ) {}
  @Post()
  // @HttpCode(204)
  async create(@Body() createCatDto: CreateCtatsDto) {
    this.catsService.create(createCatDto);
  }

  // @Get('ab*cd')
  // findAll(@Req() request: Request): string {
  //   console.log('request', request);
  //   return 'this action return all Ctas';
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('test')
  find(): string {
    console.log(this.catsService.connection);
    const { name } = this.catsService.connection;
    return 'THIS is Cats test::' + name;
  }

  @Get('user')
  getHello() {
    return this.userService.findAll();
  }
}
