import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export default class CppParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): number {
    console.log('Pipe:', metadata);
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('CPP validate failed');
    }
    return val;
  }
}
