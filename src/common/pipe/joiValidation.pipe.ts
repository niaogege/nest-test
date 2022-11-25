/**
 * 基于特定对象结构进行验证
 */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
// export const catSchema = object({
//   name: string(),
//   age: number().valid(0, 1).required().error(new Error('性别格式不正确')),
//   breed: string(),
// });

@Injectable()
export default class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('JoiValidationPipe::', metadata);
    const error = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('CPP Request error');
    }
    return value;
  }
}
