import { NmeaStdGst } from './nmea-std-gst';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdGst', () => {
  it('should create an instance', () => {
    const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    const nmea = Nmea.parse(input);
    expect(new NmeaStdGst(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdGst(nmea);

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
