import { Module, Global } from '@nestjs/common';
import { TestProvider } from './test.service';

@Global()
@Module({
  providers: [TestProvider],
  exports: ['CONNECTION'],
})
export class TestModule {}
