import { NmeaGpsRmc } from './nmea-gps-rmc';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsRmc', () => {
  it('should create an instance', () => {
    let input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    let nmea = Nmea.parse(input);
    expect(new NmeaGpsRmc(nmea)).toBeTruthy();
    input = '$GNRMC,124541.00,A,3535.80605,N,13943.46541,E,0.021,,151019,,,A*62\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaGpsRmc(nmea)).toBeTruthy();
    input = '$GNRMC,045049.00,A,3535.80288,N,13943.46284,E,2.108,,201019,,,A*68\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaGpsRmc(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsRmc(nmea);

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
