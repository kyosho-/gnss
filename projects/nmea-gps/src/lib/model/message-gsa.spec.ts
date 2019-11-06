import { MessageGsa } from './message-gsa';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';

describe('MessageGsa', () => {
  it('should create an instance', () => {
    const input = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54,1*10\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageGsa(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.opMode).toEqual('A');
    expect(m.opMode).toEqual('A');
    expect(m.navMode).toEqual(3);
    expect(m.navMode).toEqual(3);
    expect(m.svid[0]).toEqual(23);
    expect(m.svid[1]).toEqual(29);
    expect(m.svid[2]).toEqual(7);
    expect(m.svid[3]).toEqual(8);
    expect(m.svid[4]).toEqual(9);
    expect(m.svid[5]).toEqual(18);
    expect(m.svid[6]).toEqual(26);
    expect(m.svid[7]).toEqual(28);
    expect(m.svid[8]).toEqual(NaN);
    expect(m.svid[9]).toEqual(NaN);
    expect(m.svid[10]).toEqual(NaN);
    expect(m.svid[11]).toEqual(NaN);
    expect(m.pdop).toEqual(1.94);
    expect(m.pdop).toEqual(1.94);
    expect(m.hdop).toEqual(1.18);
    expect(m.hdop).toEqual(1.18);
    expect(m.vdop).toEqual(1.54);
    expect(m.vdop).toEqual(1.54);
    expect(m.systemId).toEqual(1);
    expect(m.systemId).toEqual(1);
  });

  it('should error on parse method.', () => {
    const input = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54,1*10\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGsa(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
