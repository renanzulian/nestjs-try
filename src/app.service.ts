import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getVersion(): Record<string, string> {
    return { version: `App version ${process.env.APP_VERSION || '0.1.0'}` };
  }
}
