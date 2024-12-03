import { Module } from '@nestjs/common';
import { DevLoggerService } from './dev-logger.service';
import { JsonLoggerService } from './json-logger.service';
import { TSKVLoggerService } from './tskv-logger.service';

@Module({
  providers: [DevLoggerService, JsonLoggerService, TSKVLoggerService],
  exports: [DevLoggerService, JsonLoggerService, TSKVLoggerService],
})
export class LoggerModule {}
