import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Sandeep';
  }

  getDescription(): string {
    return "This structure will be especially useful when you start converting your existing microservices/backend experience to NestJS."
  }
}
