import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let originalConsoleLog: (...args: any[]) => void;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    service = TestBed.inject(LoggerService);
    // Save original console.log and spy on it
    originalConsoleLog = console.log;
    console.log = jasmine.createSpy('consoleLog');
  });

  afterEach(() => {
    // Restore original console.log
    console.log = originalConsoleLog;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log messages with [Log] prefix', () => {
    const message = 'Test message';
    service.log(message);
    expect(console.log).toHaveBeenCalledWith('[Log]', message);
  });
});
