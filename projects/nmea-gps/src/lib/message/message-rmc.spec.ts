import { MessageRmc } from './message-rmc';
import { NmeaGps } from '../nmea-gps';
import { Ns, Ew } from '../primitive-type';

describe('MessageRmc', () => {
  it('should create an instance', () => {
    let input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    let nmea = new NmeaGps(input);
    let m = new MessageRmc(nmea);
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
    nmea = new NmeaGps(input);
    m = new MessageRmc(nmea);
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
    nmea = new NmeaGps(input);
    expect(new MessageRmc(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    try {
      const input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
      const nmea = new NmeaGps(input);
      spyOnProperty(nmea, 'splitted', 'get').and.returnValue(undefined);
      // tslint:disable-next-line: no-unused-expression
      const message = new MessageRmc(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
