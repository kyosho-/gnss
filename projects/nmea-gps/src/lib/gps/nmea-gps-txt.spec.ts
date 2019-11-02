import { NmeaGpsTxt } from './nmea-gps-txt';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaGpsTxt', () => {
  it('should create an instance', () => {
    let input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
    let nmea = Nmea.parse(input);
    expect(new NmeaGpsTxt(nmea)).toBeTruthy();
    input = '$GPTXT,01,01,02,ANTARIS ATR0620 HW 00000040*67';
    nmea = Nmea.parse(input);
    expect(new NmeaGpsTxt(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaGpsTxt(nmea);

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
