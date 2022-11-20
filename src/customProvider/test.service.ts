export const connection = {
  name: 'cpp',
  age: 31,
};

export const TestProvider = {
  provide: 'CONNECTION',
  useValue: connection,
};
