import { TestBed } from '@angular/core/testing';

import { BundleSetService } from './bundle-set.service';

describe('BundleSetService', () => {
  let service: BundleSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundleSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
