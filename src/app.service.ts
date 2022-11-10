import { Injectable, Inject } from '@nestjs/common';
@Injectable({
  durable: true,
})
export class AppService {
  // @Inject('HTTP_OPTIONS')
  // private readonly httpClient: T;

  getHello(): string {
    return 'Hello World! CPP';
  }
  getHtml() {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root"><!-- SSR_APP --></div>
        <!-- SSR_DATA -->
        <h1>This is Template cpp 123</h1>
      </body>
    </html>
    `;
  }
}
