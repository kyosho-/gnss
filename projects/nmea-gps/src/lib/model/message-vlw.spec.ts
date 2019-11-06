import { MessageVlw } from './message-vlw';
import { NmeaGps } from '../nmea-gps';

describe('MessageVlw', () => {
  it('should create an instance', () => {
    const input = '$GPVLW,,N,,N,15.8,N,1.2,N*65\r\n';
    const nmea = new NmeaGps(input);
    const m = new MessageVlw(nmea);
    expect(m).toBeTruthy();
    expect(m.twd).toEqual(NaN);
    expect(m.twd).toEqual(NaN);
    expect(m.twdUnit).toEqual('N');
    expect(m.twdUnit).toEqual('N');
    expect(m.wd).toEqual(NaN);
    expect(m.wd).toEqual(NaN);
    expect(m.wdUnit).toEqual('N');
    expect(m.wdUnit).toEqual('N');
    expect(m.tgd).toEqual(15.8);
    expect(m.tgd).toEqual(15.8);
    expect(m.tgdUnit).toEqual('N');
    expect(m.tgdUnit).toEqual('N');
    expect(m.gd).toEqual(1.2);
    expect(m.gd).toEqual(1.2);
    expect(m.gdUnit).toEqual('N');
    expect(m.gdUnit).toEqual('N');
  });

  it('should error on parse method.', () => {
    const input = '$GPVLW,,N,,N,15.8,N,1.2,N*65\r\n';
    const nmea = new NmeaGps(input);

    try {
      // const message = new MessageVlw(summary.talkerId, summary.messageId, ['', '']);
      const message = new MessageVlw(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
