import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as config from 'config';
import { IApp } from './shared/config.type';

const { NODE_ENV } = process.env;
const APP: IApp = config.get('app');

if (NODE_ENV) {
  // tslint:disable-next-line:no-console
  console.log(`\n ---------- "${NODE_ENV.toLocaleUpperCase()}" IN PROGRESS ---------- \n`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefix
  app.setGlobalPrefix('api');

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(APP.port);
  Logger.log(`Server running on http://localhost:${APP.port}`, 'Bootstrap');
}
bootstrap();
