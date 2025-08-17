import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { json } from 'express';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({ origin: [/localhost/], credentials: true });
  app.use(json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(3000);
  // eslint-disable-next-line no-console
  console.log('Backend listening on http://localhost:3000');
}
bootstrap();
