import { MessageGbs } from './message-gbs';
import { NmeaGps } from '../nmea-gps';

describe('MessageGbs', () => {
  it('should create an instance', () => {
    let input = '$GPGBS,235503.00,1.6,1.4,3.2,,,,,,*40\r\n';
    let nmea = new NmeaGps(input);
    let m = new MessageGbs(nmea);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    // expect(m.time.hour).toEqual(23);
    // expect(m.time.minute).toEqual(55);
    // expect(m.time.second).toEqual(3);
    // expect(m.time.millisecond).toEqual(0);
    expect(m.errLat).toEqual(1.6);
    expect(m.errLat).toEqual(1.6);
    expect(m.errLon).toEqual(1.4);
    expect(m.errLon).toEqual(1.4);
    expect(m.errAlt).toEqual(3.2);
    expect(m.errAlt).toEqual(3.2);
    expect(m.svid).toEqual(NaN);
    expect(m.svid).toEqual(NaN);
    expect(m.prob).toEqual(NaN);
    expect(m.prob).toEqual(NaN);
    expect(m.bias).toEqual(NaN);
    expect(m.bias).toEqual(NaN);
    expect(m.stddev).toEqual(NaN);
    expect(m.stddev).toEqual(NaN);
    expect(m.systemId).toEqual(NaN);
    expect(m.systemId).toEqual(NaN);
    expect(m.signalId).toEqual(NaN);
    expect(m.signalId).toEqual(NaN);

    input = '$GPGBS,235458.00,1.4,1.3,3.1,03,,-21.4,3.8,1,0*5A\r\n';
    nmea = new NmeaGps(input);
    m = new MessageGbs(nmea);
    expect(m).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPGBS,235503.00,1.6,1.4,3.2,,,,,,*40\r\n';
    const nmea = new NmeaGps(input);

    try {
      // const message = new MessageGbs(summary.talkerId, summary.messageId, ['', '']);
      const message = new MessageGbs(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
