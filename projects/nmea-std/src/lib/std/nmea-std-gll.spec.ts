import { NmeaStdGll } from './nmea-std-gll';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdGll', () => {
  it('should create an instance', () => {
    const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaStdGll(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdGll(nmea);

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
