import { MessageGst } from './message-gst';
import { NmeaGps } from '../nmea-gps';

describe('MessageGst', () => {
  it('should create an instance', () => {
    const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    const nmea = new NmeaGps(input);
    const m = new MessageGst(nmea);
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
    try {
      const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
      const nmea = new NmeaGps(input);
      spyOnProperty(nmea, 'splitted', 'get').and.returnValue(undefined);
      // tslint:disable-next-line: no-unused-expression
      new MessageGst(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
