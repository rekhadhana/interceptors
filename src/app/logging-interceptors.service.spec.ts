import { TestBed } from '@angular/core/testing';

import { LoggingInterceptorsService } from './logging-interceptors.service';

describe('LoggingInterceptorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggingInterceptorsService = TestBed.get(LoggingInterceptorsService);
    expect(service).toBeTruthy();
  });
});
