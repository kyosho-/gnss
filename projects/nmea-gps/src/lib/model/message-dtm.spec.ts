import { Nmea } from '@kyosho-/nmea';
import { MessageDtm } from './message-dtm';
import { NmeaGps } from '../nmea-gps';
import { Datum } from './datum.enum';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

describe('MessageDtm', () => {
  it('should create an instance', () => {
    let input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    let nmea = Nmea.parse(input);
    let summary = NmeaGps.summary(nmea);
    let splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    let m = new MessageDtm(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.datum).toEqual(Datum.WGS84);
    expect(m.datum).toEqual(Datum.WGS84);
    expect(m.subDatum).toEqual('');
    expect(m.subDatum).toEqual('');
    expect(m.lat).toEqual(0.0);
    expect(m.lat).toEqual(0.0);
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toEqual(0.0);
    expect(m.lon).toEqual(0.0);
    expect(m.ew).toEqual(Ew.E);
    expect(m.ew).toEqual(Ew.E);
    expect(m.alt).toEqual(0.0);
    expect(m.alt).toEqual(0.0);
    expect(m.refDatum).toEqual(Datum.WGS84);
    expect(m.refDatum).toEqual(Datum.WGS84);

    input = '$GPDTM,999,,0.08,N,0.07,E,-47.7,W84*1B\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    m = new MessageDtm(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const snmea = new MessageDtm(
        summary.talkerId,
        summary.messageId,
        undefined);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });

  it('should error on Not Standard.', () => {
    const input = '$PUBX,41,1,0007,0003,19200,0*25\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const snmea = new MessageDtm(
        summary.talkerId,
        summary.messageId,
        splitted);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
