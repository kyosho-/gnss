import { MessageGnq } from './message-gnq';
import { NmeaGps } from '../nmea-gps';

describe('MessageGnq', () => {
  it('should create an instance', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = new NmeaGps(input);
    const m = new MessageGnq(nmea);
    expect(m).toBeTruthy();
    expect(m.msgId).toEqual('RMC');
    expect(m.msgId).toEqual('RMC');
  });

  it('should error on parse method.', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = new NmeaGps(input);

    try {
      // const message = new MessageGnq(summary.talkerId, summary.messageId, ['', '']);
      const message = new MessageGnq(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
