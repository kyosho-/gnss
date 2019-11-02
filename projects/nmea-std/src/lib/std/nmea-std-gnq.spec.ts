import { NmeaStdGnq } from './nmea-std-gnq';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdGnq', () => {
  it('should create an instance', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaStdGnq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdGnq(nmea);

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
