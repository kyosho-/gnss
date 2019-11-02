import { TestBed } from '@angular/core/testing';

import { NmeaAisService } from './nmea-ais.service';

describe('NmeaAisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NmeaAisService = TestBed.get(NmeaAisService);
    expect(service).toBeTruthy();
  });
});
