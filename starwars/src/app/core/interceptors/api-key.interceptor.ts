import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoggerService } from '../services/logger.service';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = 'XXXXXXXXXXXXXXXX'; // Replace with your actual API key
  const logger = inject(LoggerService);
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${apiKey}`
      }
    });
  logger.log(`Intercepted request to ${req.url} with API key`);
  logger.log(`Original request: ${JSON.stringify(req)}`);
  logger.log(`Modified request: ${JSON.stringify(modifiedReq)}`);
  return next(modifiedReq);
};