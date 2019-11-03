import { Nmea } from '@kyosho-/nmea';
import { NmeaGpsDtm } from './nmea-gps-dtm';

describe('NmeaGpsDtm', () => {
  it('should create an instance', () => {
    let input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    let nmea = Nmea.parse(input);
    expect(new NmeaGpsDtm(nmea)).toBeTruthy();

    input = '$GPDTM,999,,0.08,N,0.07,E,-47.7,W84*1B\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaGpsDtm(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsDtm(nmea);

    try {
      snmea.parse(
        snmea.getTalkerId(),
        snmea.getMessageId(),
        ''
      );
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });

  it('should error on Not Standard.', () => {
    const input = '$PUBX,41,1,0007,0003,19200,0*25\r\n';
    const nmea = Nmea.parse(input);

    try {
      const snmea = new NmeaGpsDtm(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });

  it('get message.', () => {
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const snmea = new NmeaGpsDtm(Nmea.parse(input));
    const message = snmea.getMessage();
    expect(message).toBeTruthy();
  });
});
