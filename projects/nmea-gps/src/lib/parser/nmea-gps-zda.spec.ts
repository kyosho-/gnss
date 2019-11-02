import { Nmea } from '@kyosho-/nmea';
import { NmeaGpsZda } from './nmea-gps-zda';

describe('NmeaGpsZda', () => {
  it('should create an instance', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaGpsZda(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsZda(nmea);

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
