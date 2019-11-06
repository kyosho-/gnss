import { MessageGst } from './message-gst';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';
import { exec } from 'child_process';

describe('MessageGst', () => {
  it('should create an instance', () => {
    const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageGst(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.rangeRms).toEqual(1.8);
    expect(m.rangeRms).toEqual(1.8);
    expect(m.stdMajor).toEqual(NaN);
    expect(m.stdMajor).toEqual(NaN);
    expect(m.stdMinor).toEqual(NaN);
    expect(m.stdMinor).toEqual(NaN);
    expect(m.orient).toEqual(NaN);
    expect(m.orient).toEqual(NaN);
    expect(m.stdLat).toEqual(1.7);
    expect(m.stdLat).toEqual(1.7);
    expect(m.stdLong).toEqual(1.3);
    expect(m.stdLong).toEqual(1.3);
    expect(m.stdAlt).toEqual(2.2);
    expect(m.stdAlt).toEqual(2.2);
  });

  it('should error on parse method.', () => {
    const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGst(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
