import { NestFactory } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { JsonLoggerService } from './logger/json-logger.service';
import { DevLoggerService } from './logger/dev-logger.service';
import { TSKVLoggerService } from './logger/tskv-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const { LOGGER_TYPE } = process.env;
  switch (LOGGER_TYPE) {
    case 'json':
      app.useLogger(new JsonLoggerService());
      break;
    case 'tskv':
      app.useLogger(new TSKVLoggerService());
      break;
    case 'dev':
    default:
      app.useLogger(new DevLoggerService());
      break;
  }

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
