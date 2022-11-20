import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interaces/cat.interface';
import { TestModule } from './../customProvider/test.module';
@Injectable()
export class CatsService {
  public connection: any;
  constructor(@Inject('CONNECTION') connection: TestModule) {
    this.connection = connection;
  }
  private readonly cats: Cat[] = [];
  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll(): Cat[] {
    console.log(this.connection, 'connection');
    return this.cats;
  }
}
