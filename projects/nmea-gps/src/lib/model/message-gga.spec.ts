import { MessageGga } from './message-gga';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

describe('MessageGga', () => {
  it('should create an instance', () => {
    const input = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,08,1.01,499.6,M,48.0,M,,*5B';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageGga(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toBeTruthy();
    expect(m.lon).toBeTruthy();
    expect(m.ew).toEqual(Ew.E);
    expect(m.ew).toEqual(Ew.E);
    expect(m.quality).toEqual(1);
    expect(m.quality).toEqual(1);
    expect(m.numSv).toEqual(8);
    expect(m.numSv).toEqual(8);
    expect(m.hdop).toEqual(1.01);
    expect(m.hdop).toEqual(1.01);
    expect(m.alt).toEqual(499.6);
    expect(m.alt).toEqual(499.6);
    expect(m.altUnit).toEqual('M');
    expect(m.altUnit).toEqual('M');
    expect(m.sep).toEqual(48.0);
    expect(m.sep).toEqual(48.0);
    expect(m.sepUnit).toEqual('M');
    expect(m.sepUnit).toEqual('M');
    expect(m.diffAge).toEqual(NaN);
    expect(m.diffAge).toEqual(NaN);
    expect(m.diffStation).toEqual(NaN);
    expect(m.diffStation).toEqual(NaN);
  });

  it('should error on parse method.', () => {
    const input = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,08,1.01,499.6,M,48.0,M,,*5B';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGga(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
