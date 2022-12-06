## Question

[![wakatime](https://wakatime.com/badge/github/niaogege/nest-test.svg)](https://wakatime.com/badge/github/niaogege/nest-test)

- CI/CD 自动测试/打包/自动发布，脚本编写
- 提交到 **main** 分支且 commit 前缀为 feat、fix、perf 才会发布,This is why
- 如何把 **Nest** 项目部署到 github 中的 action?
- Nest 打完包都是没有带任何依赖的，发布到线上还需要按照依赖，然后用 pm2 跑下主入口

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## question

- service 端改动之后，没有实时更新, 已解决 **pnpm run start:dev**

## API 文档

### user

```js
http://localhost:3000/api/v1/user

http://111.230.199.157/api/v1/cats/test?name=cpp&age=32
```

### cats

```js
http://111.230.199.157/api/v1/cats/query?id=890
http://localhost:3000/api/v1/cats/create
http://localhost:3000/api/v1/cats/query?id=890
```
