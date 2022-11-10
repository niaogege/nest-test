import 'reflect-metadata';
export enum METADATA_KEY {
  METHOD = 'ioc:method',
  PATH = 'ioc:path',
  MIDDLEWARE = 'ioc:middleware',
}

export enum REQUEST_METHOD {
  GET = 'ioc:get',
  POST = 'ioc:post',
}

export const methodDecoratorFactory = (method: string) => {
  return (path: string): MethodDecorator => {
    const start = new Date();
    return (_target, _key, descriptor: TypedPropertyDescriptor<any>) => {
      const originMethod = descriptor.value;
      descriptor.value = async function (...args: unknown[]) {
        const res = await originMethod.apply(this, args);
        const end = new Date();
        console.log(`${String(_key)} Time: `, end.getTime() - start.getTime());
        return res;
      };
      // 在方法实现上注册 ioc:method - 请求方法 的元数据 ioc:method ioc:get
      Reflect.defineMetadata(METADATA_KEY.METHOD, method, descriptor.value);
      // 在方法实现上注册 ioc:path - 请求路径 的元数据 ioc:path /list
      console.log(descriptor.value, 'descriptor.value');
      Reflect.defineMetadata(METADATA_KEY.PATH, path, descriptor.value);
    };
  };
};

export const Get = methodDecoratorFactory(REQUEST_METHOD.GET);
export const Post = methodDecoratorFactory(REQUEST_METHOD.POST);

function Controller(path?: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(METADATA_KEY.PATH, path ?? '', target);
  };
}

type AsyncFunc = <T>(...args: T[]) => Promise<T>;

interface ICollected {
  path: string;
  requestMethod: string;
  requestHandler: AsyncFunc;
}

export const routerFactory = <T extends object>(ins: T): ICollected[] => {
  const prototype = Reflect.getPrototypeOf(ins) as any;
  const rootPath = <string>(
    Reflect.getMetadata(METADATA_KEY.PATH, prototype.constructor)
  );
  const methods = <string[]>(
    Reflect.ownKeys(prototype).filter((item) => item !== 'constructor')
  );

  const collected = methods.map((m) => {
    const requestHandler = prototype[m];
    const path = <string>Reflect.getMetadata(METADATA_KEY.PATH, requestHandler);
    const requestMethod = <string>(
      Reflect.getMetadata(METADATA_KEY.METHOD, requestHandler).replace(
        'ioc:',
        '',
      )
    );
    return {
      path: `${rootPath}${path}`,
      requestMethod,
      requestHandler,
    };
  });

  return collected;
};

@Controller('/user')
export class UserController {
  @Get('/list')
  async userList() {
    return {
      success: true,
      code: 10000,
      data: [
        {
          name: 'linbudu',
          age: 18,
        },
        {
          name: '林不渡',
          age: 28,
        },
      ],
    };
  }

  @Post('/add')
  async addUser() {
    return {
      success: true,
      code: 10000,
    };
  }
}
