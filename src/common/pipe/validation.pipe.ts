import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export default class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata, 'metadata', metadata.type);
    return value;
  }
}
