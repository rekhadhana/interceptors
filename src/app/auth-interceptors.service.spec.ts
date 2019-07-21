import { TestBed } from '@angular/core/testing';

import { AuthInterceptorsService } from './auth-interceptors.service';

describe('AuthInterceptorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptorsService = TestBed.get(AuthInterceptorsService);
    expect(service).toBeTruthy();
  });
});
