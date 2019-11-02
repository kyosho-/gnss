import { NmeaStdGpq } from './nmea-std-gpq';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdGpq', () => {
  it('should create an instance', () => {
    const input = '$GPGPQ,RMC*21\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaStdGpq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGPQ,RMC*21\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdGpq(nmea);

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
