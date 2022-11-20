import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TestModule } from '../customProvider/test.module';
import { UserModule } from 'src/user/user.module';
@Module({
  providers: [CatsService],
  controllers: [CatsController],
  imports: [TestModule, UserModule],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {
    console.log(catsService);
  }
}
