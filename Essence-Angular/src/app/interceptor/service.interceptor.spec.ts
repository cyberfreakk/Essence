import { TestBed } from '@angular/core/testing';

import { ServiceInterceptor } from './service.interceptor';

describe('ServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServiceInterceptor = TestBed.inject(ServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
