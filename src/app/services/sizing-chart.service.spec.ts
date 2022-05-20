import { TestBed } from '@angular/core/testing';

import { SizingChartService } from './sizing-chart.service';

describe('SizingChartService', () => {
  let service: SizingChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizingChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
