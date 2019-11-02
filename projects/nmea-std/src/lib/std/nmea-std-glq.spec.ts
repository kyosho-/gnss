import { NmeaStdGlq } from './nmea-std-glq';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdGlq', () => {
  it('should create an instance', () => {
    const input = '$GPGLQ,RMC*3D';
    const nmea = Nmea.parse(input);
    expect(new NmeaStdGlq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGLQ,RMC*3D';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdGlq(nmea);

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
