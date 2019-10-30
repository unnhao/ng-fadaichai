import { TestBed } from '@angular/core/testing';

import { StatusGuardService } from './status-guard.service';

describe('StatusGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusGuardService = TestBed.get(StatusGuardService);
    expect(service).toBeTruthy();
  });
});
