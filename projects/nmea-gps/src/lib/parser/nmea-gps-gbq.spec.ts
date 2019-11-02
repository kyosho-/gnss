import { Nmea } from '@kyosho-/nmea';
import { NmeaGpsGbq } from './nmea-gps-gbq';

describe('NmeaGpsGbq', () => {
  it('should create an instance', () => {
    const input = '$GNGBQ,RMC*2D\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsGbq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GNGBQ,RMC*2D\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGbq(nmea);

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
