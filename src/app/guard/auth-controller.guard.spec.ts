import { TestBed, async, inject } from '@angular/core/testing';

import { AuthControllerGuard } from './auth-controller.guard';

describe('AuthControllerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthControllerGuard]
    });
  });

  it('should ...', inject([AuthControllerGuard], (guard: AuthControllerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
