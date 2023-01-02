## Question

[![wakatime](https://wakatime.com/badge/github/niaogege/nest-test.svg)](https://wakatime.com/badge/github/niaogege/nest-test)

- CI/CD 自动测试/打包/自动发布，脚本编写如下：
- 提交到 **main** 分支或者合并到主分支的时候触发 CI 脚本
- Nest 打完包都是没有带任何依赖的，发布到线上还需要按照依赖，然后用 pm2 跑下主入口

```bash
name: DeployServer

# 在main分支发生push事件/pull_request时触发。
on:
 push:
   branches:
     - main
 pull_request:
   branches:
     - main

env:
 # 设置环境变量
 TARGET_DIR: /www/web/api

jobs:
 # 打包构建
 depoly:
   runs-on: ubuntu-latest # 运行在虚拟机环境ubuntu-latest
   steps:
     - name: Checkout # 步骤1
       uses: actions/checkout@v1 # 使用的动作。格式：userName/repoName。作用：检出仓库，获取源码。 官方actions库：https://github.com/actions
     - name: Deploy Server
       uses: cross-the-world/ssh-scp-ssh-pipelines@latest
       env:
         WELCOME: 'ssh scp ssh pipelines CPP server'
         LASTSSH: 'after copying'
       with:
         host: '111.230.199.157'
         user: 'root'
         pass: ${{ secrets.FTP_PASSWORD }}
         connect_timeout: 60s
         first_ssh: |-
           rm -rf $TARGET_DIR
           echo $WELCOME
           mkdir -p $TARGET_DIR
         scp: |-
           './*' => $TARGET_DIR/
         last_ssh: |-
           cd $TARGET_DIR
           echo $TARGET_DIR
           rm -rf node_modules
           echo $TARGET_DIR
           pnpm run build
           pm2 reload app.config.js -i max
           echo $LASTSSH
```

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
