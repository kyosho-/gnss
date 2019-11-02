import { TestBed } from '@angular/core/testing';

import { NmeaUbxService } from './nmea-ubx.service';

describe('NmeaUbxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NmeaUbxService = TestBed.get(NmeaUbxService);
    expect(service).toBeTruthy();
  });
});
