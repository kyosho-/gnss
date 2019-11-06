import { MessageGnq } from './message-gnq';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';

describe('MessageGnq', () => {
  it('should create an instance', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    const m = new MessageGnq(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.msgId).toEqual('RMC');
    expect(m.msgId).toEqual('RMC');
  });

  it('should error on parse method.', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageGnq(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
