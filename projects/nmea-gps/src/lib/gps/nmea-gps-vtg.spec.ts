import { Nmea } from '@kyosho-/nmea';
import { NmeaGpsVtg } from './nmea-gps-vtg';

describe('NmeaGpsVtg', () => {
  it('should create an instance', () => {
    const input = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsVtg(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsVtg(nmea);

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
