import * as config from 'config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

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

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(PORT);
  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
