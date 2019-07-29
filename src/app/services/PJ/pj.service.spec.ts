import { TestBed } from '@angular/core/testing';

import { PJService } from './pj.service';

describe('PJService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PJService = TestBed.get(PJService);
    expect(service).toBeTruthy();
  });
});
