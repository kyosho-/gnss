import { Nmea } from '@kyosho-/nmea';
import { MessageGll } from './message-gll';
import { NmeaGps } from '../nmea-gps';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

describe('MessageGll', () => {
  it('should create an instance', () => {
    const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageGll(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toBeTruthy();
    expect(m.lon).toBeTruthy();
    expect(m.ew).toEqual(Ew.E);
    expect(m.ew).toEqual(Ew.E);
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.status).toBeTruthy('A');
    expect(m.status).toBeTruthy('A');
    expect(m.posMode).toBeTruthy('A');
    expect(m.posMode).toBeTruthy('A');
  });

  it('should error on parse method.', () => {
    const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGll(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
