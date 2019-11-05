import { Nmea } from '@kyosho-/nmea';
import { MessageGbq } from './message-gbq';
import { NmeaGps } from '../nmea-gps';

describe('MessageGbq', () => {
  it('should create an instance', () => {
    const input = '$GNGBQ,RMC*2D\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageGbq(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.msgId).toEqual('RMC');
  });

  it('should error on parse method.', () => {
    const input = '$GNGBQ,RMC*2D\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGbq(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
