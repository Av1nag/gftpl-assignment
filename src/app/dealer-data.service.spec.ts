import { TestBed } from '@angular/core/testing';

import { DealerDataService } from './dealer-data.service';

describe('DealerDataService', () => {
  let service: DealerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
