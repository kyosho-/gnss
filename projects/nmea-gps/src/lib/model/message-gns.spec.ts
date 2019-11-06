import { MessageGns } from './message-gns';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

describe('MessageGns', () => {
  it('should create an instance', () => {
    let input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    let nmea = Nmea.parse(input);
    let summary = NmeaGps.summary(nmea);
    let splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    let m = new MessageGns(summary.talkerId, summary.messageId, splitted);
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
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    expect(new MessageGns(summary.talkerId, summary.messageId, splitted)).toBeTruthy();
    input = '$GPGNS,122310.2,,,,,,07,,,,5.2,23,V*07\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    expect(new MessageGns(summary.talkerId, summary.messageId, splitted)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGns(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
