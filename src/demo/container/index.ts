export type ClassContruct<T = any> = new (...args) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
type ServiceKey<T = any> = string | ClassContruct<T> | Function;

export class Container {
  public static propertyRegistry: Map<string, string> = new Map();
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
      // 拿出需要注入的类 这里已经拿到了实例化之后的了
      const target = Container.get(serviceKey);
      if (target) {
        Ins[prop] = target;
      }
    }
    return Ins;
  }
}

@Provide('Cppservice')
export class Cpp {
  getName(name) {
    return 'cpp:::' + name;
  }
}

@Provide('DriverService')
export class Driver {
  adapt(consumer) {
    console.log(`\n Driver 生效${consumer}`);
  }
}

@Provide()
export class Car {
  @Inject1('DriverService')
  // driver = new Driver();
  driver!: Driver;

  @Inject1('Cppservice')
  cpp!: Cpp;

  run() {
    this.driver.adapt('Car');
    this.cpp.getName('Car');
  }
}

@Provide()
export class Bus {
  @Inject1()
  driver!: Driver;
  @Inject1()
  fule!: Cpp;

  run() {
    this.fule.getName('Bus');
    this.driver.adapt('Bus');
  }
}

// 设置 自动被容器收集
function Provide(key?: string): ClassDecorator {
  return (target) => {
    Container.set(key ?? target.name, target as unknown as ClassContruct);
    // 不论是否传入 key，都使用 Class 作为 key 注册一份
    Container.set(target, target as unknown as ClassContruct);
  };
}

// 注册 Car:driver - DriverService
function Inject1(key?: string): PropertyDecorator {
  return (target, propertyKey) => {
    Container.propertyRegistry.set(
      `${target.constructor.name}:${String(propertyKey)}`,
      key ?? Reflect.getMetadata('design:type', target, propertyKey),
    );
  };
}

const car = Container.get<Car>('Car');
car.run();
