import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Query,
  DefaultValuePipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interaces/cat.interface';
import { CreateCtatsDto } from './dto/create-cat.dto';
import { UserService } from '../user/user.service';
import CppParseIntPipe from '../common/pipe/parse-int.pipe';
import AuthGuard from 'src/common/guard/auth.guard';
import { Roles } from '../common/decorator/role.decorator';
// import JoiValidationPipe, {
//   catSchema,
// } from 'src/common/pipe/joiValidation.pipe';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(
    private catsService: CatsService,
    private readonly userService: UserService,
  ) {}
  @Post('create')
  @Roles('admins')
  async create(@Body() createCatDto: CreateCtatsDto) {
    this.catsService.create(createCatDto);
    return this.catsService.cats;
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
  find(@Req() request: any): string {
    const { name: qName, age } = request.query;
    return 'THIS is Cats test::' + qName + '\nage::' + age;
  }

  @Get('user')
  getHello() {
    return this.userService.findAll();
  }

  @Get('query')
  async findOne(
    @Query('id', new DefaultValuePipe(0), CppParseIntPipe) id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Get('uuid/:uuid')
  async findUUid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid;
  }
  @Get('image')
  async getImage() {
    return 'https://c2.im5i.com/2023/01/02/YwkFR.png';
  }
}
