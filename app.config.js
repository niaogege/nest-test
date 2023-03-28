// import path from 'path';
// import { resolve } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
  apps: [
    {
      name: 'NestJs Cpp Test',
      script: path.resolve(__dirname, './dist/main.js'),
      // 启动应用的模式, 有两种：cluster和fork，默认是fork
      exec_mode: 'fork',
      // 创建应用实例的数量
      instances: 'max',
      // 开启监听，当文件变化后自动重启应用
      watch: true,
      // 忽略掉一些目录文件的变化。
      // 由于把日志目录放到了项目路径下，一定要将其忽略，否则应用启动产生日志，pm2 监听到变化就会重启，重启又产生日志，就会进入死循环
      // ignore_watch: ['node_modules', 'logs'],
      // // 错误日志存放路径
      output: path.resolve(__dirname, './logs/out.log'),
      error: path.resolve(__dirname, './logs/error.log'),
      merge_logs: true,
      // 设置日志文件中每条日志前面的日期格式
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
