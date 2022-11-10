import 'reflect-metadata';

const requiredMetadataKey = Symbol('requiredKeys');
function Required(): PropertyDecorator {
  return (target, prop) => {
    const existRequiredKeys: string[] =
      Reflect.getMetadata(requiredMetadataKey, target) ?? [];
    Reflect.defineMetadata(
      requiredMetadataKey,
      [...existRequiredKeys, prop],
      target,
    );
  };
}

enum TypeValidation {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

const validationMetadataKey = Symbol('expectedType');
function ValueType(type: TypeValidation): PropertyDecorator {
  return (target, prop) => {
    if (typeof target[prop] !== type) {
      console.log('类型不一样');
    }
    Reflect.defineMetadata(validationMetadataKey, type, target, prop);
  };
}

class User {
  @Required()
  name!: string;

  @ValueType(TypeValidation.Number)
  age!: number;
}

const user = new User();
user.age = 18;

function validator(entity: any) {
  const clsName = entity.constructor.name;
  const messages: string[] = [];
  // 先检查必填属性
  const requiredKeys = Reflect.getMetadata(requiredMetadataKey, entity);
  // 获取存在的属性
  const existKeys = Reflect.ownKeys(entity);
  for (const key of requiredKeys) {
    if (!existKeys.includes(key)) {
      messages.push(`${clsName}.${key} should be required.`);
      // throw new Error(`${key} is required!`);
    }
  }
  for (const key of existKeys) {
    const expectedType: string = Reflect.getMetadata(
      validationMetadataKey,
      entity,
      key,
    );
    const typesVal: string[] = Object.values(TypeValidation);
    if (typesVal.includes(expectedType)) {
      const actualType = typeof entity[key];
      if (actualType !== expectedType) {
        messages.push(
          `expect ${entity.constructor.name}.${String(
            key,
          )} to be ${expectedType}, but got ${actualType}.`,
        );
        // throw new Error(`${String(key)} is not ${expectedType}!`);
      }
    }
  }
  return messages;
}

console.log(validator(user));

class TestA {
  p: string;
  constructor(p: string) {
    this.p = p;
  }
}
export class TestB {
  name!: TestA;
}
