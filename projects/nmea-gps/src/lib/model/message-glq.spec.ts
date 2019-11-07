import { MessageGlq } from './message-glq';
import { NmeaGps } from '../nmea-gps';

describe('MessageGlq', () => {
  it('should create an instance', () => {
    const input = '$GPGLQ,RMC*3D';
    const nmea = new NmeaGps(input);
    const m = new MessageGlq(nmea);
    expect(m).toBeTruthy();
    expect(m.msgId).toEqual('RMC');
    expect(m.msgId).toEqual('RMC');
  });

  it('should error on parse method.', () => {
    // const input = '$GPGLQ,RMC*3D';
    const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    const nmea = new NmeaGps(input);

    try {
      // const message = new MessageGlq(summary.talkerId, summary.messageId, ['', '']);
      const message = new MessageGlq(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
