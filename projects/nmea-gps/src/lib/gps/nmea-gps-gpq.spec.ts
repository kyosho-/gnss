import { NmeaGpsGpq } from './nmea-gps-gpq';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsGpq', () => {
  it('should create an instance', () => {
    const input = '$GPGPQ,RMC*21\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsGpq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGPQ,RMC*21\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGpq(nmea);

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
