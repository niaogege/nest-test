## Question

- CI/CD 自动测试/自动发布，脚本编写
- 提交到 **main** 分支且 commit 前缀为 feat、fix、perf 才会发布
- 如何把 **Nest** 项目部署到 github page

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

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
```

### cats

```js
http://localhost:3000/api/v1/cats/create
http://localhost:3000/api/v1/cats/query?id=890
```
