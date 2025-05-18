import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { of } from 'rxjs';
import { apiKeyInterceptor } from './api-key.interceptor';
import { LoggerService } from '../services/logger.service';

describe('apiKeyInterceptor', () => {
  let loggerSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [{ provide: LoggerService, useValue: loggerSpy }]
    });
  });

  it('should add API key header and call next handler', () => {
    const dummyReq = new HttpRequest('GET', '/data');
    const dummyResponse = { success: true };
    const next: HttpHandlerFn = jasmine.createSpy('nextSpy').and.returnValue(of(dummyResponse));

    // Execute interceptor within injection context to resolve LoggerService
    const result$ = TestBed.runInInjectionContext(() => apiKeyInterceptor(dummyReq, next));
    let receivedResponse: any;
    result$.subscribe(res => (receivedResponse = res));

    // Next handler should be called with a modified request containing the API key header
    expect(next).toHaveBeenCalledOnceWith(jasmine.any(HttpRequest));
    const modifiedReq: HttpRequest<any> = (next as jasmine.Spy).calls.mostRecent().args[0];
    expect(modifiedReq.headers.get('Authorization')).toBe('Bearer XXXXXXXXXXXXXXXX');

    // The interceptor should return the result from the next handler
    expect(receivedResponse).toBe(dummyResponse);

    // LoggerService.log should be called three times with relevant messages
    expect(loggerSpy.log).toHaveBeenCalledWith(`Intercepted request to /data with API key`);
    expect(loggerSpy.log.calls.count()).toBe(3);
  });
});

