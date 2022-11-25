import 'reflect-metadata';
export type ClassContruct<T = any> = new (...args) => T;

type ServiceKey<T = any> = string | ClassContruct<T>;

export class Container {
  // 注入的类名
  public static propertyRegistry: Map<string, string> = new Map();
  // 设置的属性
  private static services: Map<ServiceKey, ClassContruct> = new Map();

  public static set(key: ServiceKey, val: ClassContruct): void {
    Container.services.set(key, val);
  }

  public static get<T = any>(key: ServiceKey): T | undefined {
    // 检查是否注册过
    const Cons = Container.services.get(key);
    console.log('Cons::', Cons);
    if (!Cons) return undefined;
    // 实例化传入标识符的类
    const Ins = new Cons();
    for (const info of Container.propertyRegistry) {
      // 注入标识符与要注入类的标识符
      // Car:driver DriverService
      const [injectKey, serviceKey] = info;
      // Class名称 和 属性名driver
      const [classKey, prop] = injectKey.split(':');
      if (classKey !== Cons.name) continue;
      // 拿出需要注入的类 也就是Provide这里的传參
      const target = Container.get(serviceKey);
      if (target) {
        Ins[prop] = target;
      }
    }
    return Ins;
  }
}

@Provide('DriverService')
export class Driver {
  adapt(consumer: string) {
    console.log(`\n === 驱动已生效于 ${consumer}！===\n`);
  }
}

@Provide()
export class Fuel {
  fill(consumer: string) {
    console.log(`\n === 燃料已填充完毕 ${consumer}！===`);
  }
}

@Provide()
class Car {
  @Inject1()
  driver!: Driver;

  @Inject1()
  fule!: Fuel;

  run() {
    this.fule.fill('Car');
    this.driver.adapt('Car');
  }
}

// 设置 自动被容器收集
function Provide(key?: string): ClassDecorator {
  return (Target) => {
    Container.set(key ?? Target.name, Target as unknown as ClassContruct);
    Container.set(Target, Target as unknown as ClassContruct);
  };
}
// 注册 Car:driver - DriverService
function Inject1(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Container.propertyRegistry.set(
      // Car:driver
      `${target.constructor.name}:${String(propertyKey)}`,
      key ?? Reflect.getMetadata('design:type', target, propertyKey),
    );
  };
}

const car = Container.get<Car>('Car');
car.run();
