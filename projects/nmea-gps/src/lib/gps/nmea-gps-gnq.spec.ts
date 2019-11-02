import { NmeaGpsGnq } from './nmea-gps-gnq';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsGnq', () => {
  it('should create an instance', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsGnq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGnq(nmea);

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
