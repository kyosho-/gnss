import { MessageGpq } from './message-gpq';
import { NmeaGps } from '../nmea-gps';

describe('MessageGpq', () => {
  it('should create an instance', () => {
    const input = '$GPGPQ,RMC*21\r\n';
    const nmea = new NmeaGps(input);
    const m = new MessageGpq(nmea);
    expect(m).toBeTruthy();
    expect(m.msgId).toEqual('RMC');
  });

  it('should error on parse method.', () => {
    // const input = '$GPGPQ,RMC*21\r\n';
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const nmea = new NmeaGps(input);

    try {
      // const message = new MessageGpq(summary.talkerId, summary.messageId, ['', '']);
      const m = new MessageGpq(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
