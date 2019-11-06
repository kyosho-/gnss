import { MessageRmc } from './message-rmc';
import { Nmea } from '@kyosho-/nmea';
import { NmeaGps } from '../nmea-gps';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

describe('MessageRmc', () => {
  it('should create an instance', () => {
    let input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    let nmea = Nmea.parse(input);
    let summary = NmeaGps.summary(nmea);
    let splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    let m = new MessageRmc(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.status).toEqual('A');
    expect(m.status).toEqual('A');
    expect(m.lat).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toBeTruthy();
    expect(m.lon).toBeTruthy();
    expect(m.ew).toEqual(Ew.E);
    expect(m.ew).toEqual(Ew.E);
    expect(m.spd).toEqual(0.004);
    expect(m.spd).toEqual(0.004);
    expect(m.cog).toEqual(77.52);
    expect(m.cog).toEqual(77.52);
    expect(m.date).toBeTruthy();
    expect(m.date).toBeTruthy();
    expect(m.mv).toEqual(NaN);
    expect(m.mv).toEqual(NaN);
    expect(m.mvEw).toEqual('');
    expect(m.mvEw).toEqual('');
    expect(m.posMode).toEqual('A');
    expect(m.posMode).toEqual('A');
    expect(m.navStatus).toEqual('V');
    expect(m.navStatus).toEqual('V');

    input = '$GNRMC,124541.00,A,3535.80605,N,13943.46541,E,0.021,,151019,,,A*62\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    m = new MessageRmc(summary.talkerId, summary.messageId, splitted);
    expect(m).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.status).toEqual('A');
    expect(m.status).toEqual('A');
    expect(m.lat).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toBeTruthy();
    expect(m.lon).toBeTruthy();
    expect(m.ew).toEqual(Ew.E);
    expect(m.ew).toEqual(Ew.E);
    expect(m.spd).toEqual(0.021);
    expect(m.spd).toEqual(0.021);
    expect(m.cog).toEqual(NaN);
    expect(m.cog).toEqual(NaN);
    expect(m.date).toBeTruthy();
    expect(m.date).toBeTruthy();
    expect(m.mv).toEqual(NaN);
    expect(m.mv).toEqual(NaN);
    expect(m.mvEw).toEqual('');
    expect(m.mvEw).toEqual('');
    expect(m.posMode).toEqual('A');
    expect(m.posMode).toEqual('A');
    expect(m.navStatus).toEqual(undefined);
    expect(m.navStatus).toEqual(undefined);

    input = '$GNRMC,045049.00,A,3535.80288,N,13943.46284,E,2.108,,201019,,,A*68\r\n';
    nmea = Nmea.parse(input);
    summary = NmeaGps.summary(nmea);
    splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);
    expect(new MessageRmc(summary.talkerId, summary.messageId, splitted)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    const input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    const nmea = Nmea.parse(input);
    const summary = NmeaGps.summary(nmea);
    const splitted = nmea.getValue().split(NmeaGps.FIELD_DELIMITER);

    try {
      const message = new MessageRmc(summary.talkerId, summary.messageId, ['', '']);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
