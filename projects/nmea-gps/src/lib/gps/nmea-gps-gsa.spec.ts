import { NmeaGpsGsa } from './nmea-gps-gsa';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsGsa', () => {
  it('should create an instance', () => {
    const input = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54,1*10\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsGsa(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54,1*10\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGsa(nmea);

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
});
