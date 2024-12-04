// import { Test, TestingModule } from '@nestjs/testing';
import { JsonLoggerService } from './json-logger.service';

describe('JsonLoggerService', () => {
  let jsonLogger: JsonLoggerService;
  const logMessage = {
    message: 'test message',
    optionalParams: ['optionalParams', 'test'],
  };

  beforeEach(() => {
    jsonLogger = new JsonLoggerService();
    jest.spyOn(console, 'log');
    jest.spyOn(console, 'error');
    jest.spyOn(console, 'warn');
    jest.spyOn(console, 'debug');
    jest.spyOn(console, 'info');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(jsonLogger).toBeDefined();
  });

  it('send message to level LOG and format to json', () => {
    jsonLogger.log(logMessage.message, logMessage.optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      '{"level":"log","message":"test message","optionalParams":[[["optionalParams","test"]]]}',
    );
  });

  it('send message to level ERROR and format to json', () => {
    jsonLogger.error(logMessage.message, logMessage.optionalParams);
    expect(console.error).toHaveBeenCalledWith(
      '{"level":"error","message":"test message","optionalParams":[[["optionalParams","test"]]]}',
    );
  });

  it('send message to level WARN and format to json', () => {
    jsonLogger.warn(logMessage.message, logMessage.optionalParams);
    expect(console.warn).toHaveBeenCalledWith(
      '{"level":"warn","message":"test message","optionalParams":[[["optionalParams","test"]]]}',
    );
  });

  it('send message to level DEBUG and format to json', () => {
    jsonLogger.debug(logMessage.message, logMessage.optionalParams);
    expect(console.debug).toHaveBeenCalledWith(
      '{"level":"debug","message":"test message","optionalParams":[[["optionalParams","test"]]]}',
    );
  });

  it('send message to level VERBOSE and format to json', () => {
    jsonLogger.verbose(logMessage.message, logMessage.optionalParams);
    expect(console.info).toHaveBeenCalledWith(
      '{"level":"verbose","message":"test message","optionalParams":[[["optionalParams","test"]]]}',
    );
  });

  it('send message to level FATAL and format to json', () => {
    jsonLogger.fatal(logMessage.message, logMessage.optionalParams);
    expect(console.error).toHaveBeenCalledWith(
      '{"level":"fatal","message":"test message","optionalParams":[[["optionalParams","test"]]]}',
    );
  });
});
