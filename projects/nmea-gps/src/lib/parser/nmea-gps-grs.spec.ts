import { NmeaGpsGrs } from './nmea-gps-grs';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsGrs', () => {
  it('should create an instance', () => {
    let input = '$GNGRS,104148.00,1,2.6,2.2,-1.6,-1.1,-1.7,-1.5,5.8,1.7,,,,,1,1*52\r\n';
    let nmea = Nmea.parse(input);
    expect(new NmeaGpsGrs(nmea)).toBeTruthy();
    input = '$GNGRS,104148.00,1,,0.0,2.5,0.0,,2.8,,,,,,,1,5*51\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaGpsGrs(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GNGRS,104148.00,1,2.6,2.2,-1.6,-1.1,-1.7,-1.5,5.8,1.7,,,,,1,1*52\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGrs(nmea);

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

    try {
      snmea.parse(
        snmea.getTalkerId(),
        snmea.getMessageId(),
        ',,'
      );
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
