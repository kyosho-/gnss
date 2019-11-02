import { NmeaGpsGlq } from './nmea-gps-glq';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsGlq', () => {
  it('should create an instance', () => {
    const input = '$GPGLQ,RMC*3D';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsGlq(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGLQ,RMC*3D';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsGlq(nmea);

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
