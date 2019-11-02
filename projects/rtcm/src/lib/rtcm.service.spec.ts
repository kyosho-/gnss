import { TestBed } from '@angular/core/testing';

import { RtcmService } from './rtcm.service';

describe('RtcmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RtcmService = TestBed.get(RtcmService);
    expect(service).toBeTruthy();
  });
});
