import { TSKVLoggerService } from './tskv-logger.service';

describe('TskvLoggerService', () => {
  let tskvLogger: TSKVLoggerService;
  const logMessage = {
    message: 'test message',
    optionalParams: ['optionalParams', 'test'],
  };

  beforeEach(() => {
    tskvLogger = new TSKVLoggerService();
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockImplementation(() => '2024-12-03T00:00:00.000Z');
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
    expect(tskvLogger).toBeDefined();
  });

  it('send message to level LOG and format to tskv', () => {
    tskvLogger.log(logMessage.message, logMessage.optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      'time=2024-12-03T00:00:00.000Z\tlevel=log\tmessage=test message\toptionalParams=optionalParams,test',
    );
  });

  it('send message to level ERROR and format to tskv', () => {
    tskvLogger.error(logMessage.message, logMessage.optionalParams);
    expect(console.error).toHaveBeenCalledWith(
      'time=2024-12-03T00:00:00.000Z\tlevel=error\tmessage=test message\toptionalParams=optionalParams,test',
    );
  });

  it('send message to level WARN and format to tskv', () => {
    tskvLogger.warn(logMessage.message, logMessage.optionalParams);
    expect(console.warn).toHaveBeenCalledWith(
      'time=2024-12-03T00:00:00.000Z\tlevel=warn\tmessage=test message\toptionalParams=optionalParams,test',
    );
  });

  it('send message to level DEBUG and format to tskv', () => {
    tskvLogger.debug(logMessage.message, logMessage.optionalParams);
    expect(console.debug).toHaveBeenCalledWith(
      'time=2024-12-03T00:00:00.000Z\tlevel=debug\tmessage=test message\toptionalParams=optionalParams,test',
    );
  });

  it('send message to level VERBOSE and format to tskv', () => {
    tskvLogger.verbose(logMessage.message, logMessage.optionalParams);
    expect(console.info).toHaveBeenCalledWith(
      'time=2024-12-03T00:00:00.000Z\tlevel=verbose\tmessage=test message\toptionalParams=optionalParams,test',
    );
  });

  it('send message to level FATAL and format to tskv', () => {
    tskvLogger.fatal(logMessage.message, logMessage.optionalParams);
    expect(console.error).toHaveBeenCalledWith(
      'time=2024-12-03T00:00:00.000Z\tlevel=fatal\tmessage=test message\toptionalParams=optionalParams,test',
    );
  });
});
