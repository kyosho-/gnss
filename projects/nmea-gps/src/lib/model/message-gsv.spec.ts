import { Nmea } from '@kyosho-/nmea';
import { MessageGsv } from './message-gsv';
import { NmeaGps } from '../nmea-gps';

describe('MessageGsv', () => {
  it('should create an instance', () => {
    let input = '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F\r\n';
    let nmea = Nmea.parse(input);
    let sn: MessageGsv;
    let summary = NmeaGps.summary(nmea);
    let splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    sn = new MessageGsv(summary.talkerId, summary.messageId, splitted);
    expect(sn).toBeTruthy();
    expect((sn.signalId)).not.toBeUndefined();

    input = '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    sn = new MessageGsv(summary.talkerId, summary.messageId, splitted);
    expect(sn).toBeTruthy();
    expect((sn.signalId)).not.toBeUndefined();

    input = '$GPGSV,3,3,09,25,,,40,1*6E\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    sn = new MessageGsv(summary.talkerId, summary.messageId, splitted);
    expect(sn).toBeTruthy();
    expect((sn.signalId)).not.toBeUndefined();

    input = '$GPGSV,1,1,03,12,,,42,24,,,47,32,,,37,5*66\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    sn = new MessageGsv(summary.talkerId, summary.messageId, splitted);
    expect(sn).toBeTruthy();
    expect((sn.signalId)).not.toBeUndefined();

    input = '$GAGSV,1,1,00,2*76\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    sn = new MessageGsv(summary.talkerId, summary.messageId, splitted);
    expect(sn).toBeTruthy();
    expect((sn.signalId)).not.toBeUndefined();

    input = '$GLGSV,2,2,08,80,33,048,17,81,03,019,,82,27,061,14,83,26,117,*68\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    sn = new MessageGsv(summary.talkerId, summary.messageId, splitted);
    expect(sn).toBeTruthy();
    // expect((sn.signalId)).not.toBeUndefined();
  });

  it('should error on parse method.', () => {
    const input = '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGsv(
        summary.talkerId,
        summary.messageId,
        ['']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }

    try {
      const message = new MessageGsv(
        summary.talkerId,
        summary.messageId,
        ['', '', '']);
      // fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }

    try {
      const message = new MessageGsv(
        summary.talkerId,
        summary.messageId,
        ['', '', '', '']);
      // fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
