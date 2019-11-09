import { MessageGns } from './message-gns';
import { NmeaGps } from '../nmea-gps';
import { Ns, Ew } from '../primitive-type';

describe('MessageGns', () => {
  it('should create an instance', () => {
    let input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    let nmea = new NmeaGps(input);
    let m = new MessageGns(nmea);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toBeTruthy();
    expect(m.lon).toBeTruthy();
    expect(m.ew).toEqual(Ew.W);
    expect(m.ew).toEqual(Ew.W);
    expect(m.posMode).toEqual('ANNN');
    expect(m.posMode).toEqual('ANNN');
    expect(m.numSv).toEqual(7);
    expect(m.numSv).toEqual(7);
    expect(m.hdop).toEqual(1.18);
    expect(m.hdop).toEqual(1.18);
    expect(m.alt).toEqual(111.5);
    expect(m.alt).toEqual(111.5);
    expect(m.sep).toEqual(45.6);
    expect(m.sep).toEqual(45.6);
    expect(m.diffAge).toEqual(NaN);
    expect(m.diffAge).toEqual(NaN);
    expect(m.diffStation).toEqual(NaN);
    expect(m.diffStation).toEqual(NaN);
    expect(m.navStatus).toEqual('V');
    expect(m.navStatus).toEqual('V');

    input = '$GNGNS,122310.2,3722.425671,N,12258.856215,W,DAAA,14,0.9,1005.543,6.5,,,V*0B\r\n';
    nmea = new NmeaGps(input);
    expect(new MessageGns(nmea)).toBeTruthy();
    input = '$GPGNS,122310.2,,,,,,07,,,,5.2,23,V*07\r\n';
    nmea = new NmeaGps(input);
    expect(new MessageGns(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    try {
      const input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
      const nmea = new NmeaGps(input);
      spyOnProperty(nmea, 'splitted', 'get').and.returnValue(undefined);
      // tslint:disable-next-line: no-unused-expression
      new MessageGns(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
