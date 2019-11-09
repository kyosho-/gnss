import { MessageGbq } from './message-gbq';
import { NmeaGps } from '../nmea-gps';

describe('MessageGbq', () => {
  it('should create an instance', () => {
    const input = '$GNGBQ,RMC*2D\r\n';
    const nmea = new NmeaGps(input);
    const m = new MessageGbq(nmea);
    expect(m).toBeTruthy();
    expect(m.msgId).toEqual('RMC');
  });

  it('should error on parse method.', () => {
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const nmea = new NmeaGps(input);

    try {
      // const message = new MessageGbq(summary.talkerId, summary.messageId, ['', '']);
      const message = new MessageGbq(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
