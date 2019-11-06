import { MessageGrs } from './message-grs';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';

describe('MessageGrs', () => {
  it('should create an instance', () => {
    let input = '$GNGRS,104148.00,1,2.6,2.2,-1.6,-1.1,-1.7,-1.5,5.8,1.7,,,,,1,1*52\r\n';
    let nmea = Nmea.parse(input);
    let summary = NmeaGps.summary(nmea);
    let splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    let m = new MessageGrs(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.mode).toEqual(1);
    expect(m.mode).toEqual(1);

    expect(m.residual[0]).toEqual(2.6);
    expect(m.residual[1]).toEqual(2.2);
    expect(m.residual[2]).toEqual(-1.6);
    expect(m.residual[3]).toEqual(-1.1);
    expect(m.residual[4]).toEqual(-1.7);
    expect(m.residual[5]).toEqual(-1.5);
    expect(m.residual[6]).toEqual(5.8);
    expect(m.residual[7]).toEqual(1.7);
    expect(m.residual[8]).toEqual(NaN);
    expect(m.residual[9]).toEqual(NaN);
    expect(m.residual[10]).toEqual(NaN);
    expect(m.residual[11]).toEqual(NaN);

    expect(m.systemId).toEqual(1);
    expect(m.systemId).toEqual(1);
    expect(m.signalId).toEqual(1);
    expect(m.signalId).toEqual(1);


    input = '$GNGRS,104148.00,1,,0.0,2.5,0.0,,2.8,,,,,,,1,5*51\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    expect(new MessageGrs(summary.talkerId, summary.messageId, splitted)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GNGRS,104148.00,1,2.6,2.2,-1.6,-1.1,-1.7,-1.5,5.8,1.7,,,,,1,1*52\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGrs(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }

    try {
      const message = new MessageGrs(summary.talkerId, summary.messageId, ['', '', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
