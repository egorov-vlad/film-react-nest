import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TSKVLoggerService implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString();

    return `time=${timestamp}\tlevel=${level}\tmessage=${message}\toptionalParams=${optionalParams}`;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info(this.formatMessage('verbose', message, optionalParams));
  }

  fatal?(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }
}
