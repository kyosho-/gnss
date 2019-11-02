import { NmeaStdVlw } from './nmea-std-vlw';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdVlw', () => {
  it('should create an instance', () => {
    const input = '$GPVLW,,N,,N,15.8,N,1.2,N*65\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaStdVlw(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPVLW,,N,,N,15.8,N,1.2,N*65\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdVlw(nmea);

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
