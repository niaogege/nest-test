// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
import { routerFactory, UserController } from './index';
const collected = routerFactory(new UserController());
console.log(collected, 'collected');
console.log(http, 'http');
http
  .createServer((req, res) => {
    const displayUrls = collected.map((e) => e.path);
    if (displayUrls.includes(req.url)) {
      for (const info of collected) {
        if (
          req.url === info.path &&
          req.method === info.requestMethod.toLocaleUpperCase()
        ) {
          info.requestHandler().then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
          });
        }
      }
    } else {
      res.end(
        JSON.stringify({
          name: 'CPP',
        }),
      );
    }
  })
  .listen(3003)
  .on('listening', () => {
    console.log('Server ready at http://localhost:3003 \n');
    console.log('GET /user/list at http://localhost:3003/user/list \n');
    console.log('POST /user/add at http://localhost:3003/user/add \n');
  });
