import { Nmea } from '@kyosho-/nmea';
import { NmeaGpsGbs } from './nmea-gps-gbs';

describe('NmeaGpsGbs', () => {
  it('should create an instance', () => {
    let input = '$GPGBS,235503.00,1.6,1.4,3.2,,,,,,*40\r\n';
    let nmea = Nmea.parse(input);
    expect(new NmeaGpsGbs(nmea)).toBeTruthy();
    input = '$GPGBS,235458.00,1.4,1.3,3.1,03,,-21.4,3.8,1,0*5A\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaGpsGbs(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGBS,235503.00,1.6,1.4,3.2,,,,,,*40\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGbs(nmea);

    try {
      snmea.parse(
        snmea.getTalkerId(),
        snmea.getMessageId(),
        ','
      );
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});