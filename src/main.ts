import * as config from 'config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const { NODE_ENV } = process.env;
const { PORT } = config.get('SERVER');

if (NODE_ENV) {
  // tslint:disable-next-line:no-console
  console.log(`\n ---------- "${NODE_ENV.toLocaleUpperCase()}" IN PROGRESS ---------- \n`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefix
  app.setGlobalPrefix('api');

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
