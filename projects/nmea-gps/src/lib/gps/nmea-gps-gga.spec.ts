import { NmeaGpsGga } from './nmea-gps-gga';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsGga', () => {
  it('should create an instance', () => {
    const input = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,08,1.01,499.6,M,48.0,M,,*5B';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsGga(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,08,1.01,499.6,M,48.0,M,,*5B';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGga(nmea);

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
