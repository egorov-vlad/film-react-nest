import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLoggerService extends ConsoleLogger {
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }
}
