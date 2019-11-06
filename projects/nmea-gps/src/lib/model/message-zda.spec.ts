import { Nmea } from '@kyosho-/nmea';
import { MessageZda } from './message-zda';
import { NmeaGps } from '../nmea-gps';

describe('MessageZda', () => {
  it('should create an instance', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageZda(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.day).toEqual(16);
    expect(m.day).toEqual(16);
    expect(m.month).toEqual(9);
    expect(m.month).toEqual(9);
    expect(m.year).toEqual(2002);
    expect(m.year).toEqual(2002);
    expect(m.ltzh).toEqual(0);
    expect(m.ltzh).toEqual(0);
    expect(m.ltzn).toEqual(0);
    expect(m.ltzn).toEqual(0);
  });

  it('should error on parse method.', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageZda(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});