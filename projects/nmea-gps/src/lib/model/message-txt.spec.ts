import { MessageTxt } from './message-txt';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';

describe('MessageTxt', () => {
  it('should create an instance', () => {
    let input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
    let nmea = Nmea.parse(input);
    let summary = NmeaGps.summary(nmea);
    let splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    let m = new MessageTxt(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.numMsg).toEqual(1);
    expect(m.numMsg).toEqual(1);
    expect(m.msgNum).toEqual(1);
    expect(m.msgNum).toEqual(1);
    expect(m.msgType).toEqual(2);
    expect(m.msgType).toEqual(2);
    expect(m.text).toEqual('u-blox ag - www.u-blox.com');
    expect(m.text).toEqual('u-blox ag - www.u-blox.com');


    input = '$GPTXT,01,01,02,ANTARIS ATR0620 HW 00000040*67';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    expect(new MessageTxt(summary.talkerId, summary.messageId, splitted)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageTxt(summary.talkerId, summary.messageId, ['', '']); fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
