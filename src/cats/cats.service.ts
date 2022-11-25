import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interaces/cat.interface';
import { TestModule } from './../customProvider/test.module';
@Injectable()
export class CatsService {
  public connection: any;
  constructor(@Inject('CONNECTION') connection: TestModule) {
    this.connection = connection;
  }
  public readonly cats: Cat[] = [];
  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll(): Cat[] {
    console.log(this.connection, 'connection');
    return this.cats;
  }
  findOne(id: number): string {
    return 'this csts ONE::' + id;
  }
}
