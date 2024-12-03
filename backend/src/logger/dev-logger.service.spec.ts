import { Test, TestingModule } from '@nestjs/testing';
import { DevLoggerService } from './dev-logger.service';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLoggerService', () => {
  let service: DevLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLoggerService],
    }).compile();

    service = module.get<DevLoggerService>(DevLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be instanced', () => {
    expect(service).toBeInstanceOf(ConsoleLogger);
  });
});
