import { NmeaStdGns } from './nmea-std-gns';
import { Nmea } from '@kyosho-/nmea';

describe('NmeaStdGns', () => {
  it('should create an instance', () => {
    let input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    let nmea = Nmea.parse(input);
    expect(new NmeaStdGns(nmea)).toBeTruthy();
    input = '$GNGNS,122310.2,3722.425671,N,12258.856215,W,DAAA,14,0.9,1005.543,6.5,,,V*0B\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaStdGns(nmea)).toBeTruthy();
    input = '$GPGNS,122310.2,,,,,,07,,,,5.2,23,V*07\r\n';
    nmea = Nmea.parse(input);
    expect(new NmeaStdGns(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    const nmea = Nmea.parse(input);
    const snmea = new NmeaStdGns(nmea);

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
