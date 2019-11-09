import { MessageGll } from './message-gll';
import { NmeaGps } from '../nmea-gps';
import { Ns, Ew } from '../primitive-type';

describe('MessageGll', () => {
  it('should create an instance', () => {
    const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    const nmea = new NmeaGps(input);
    const m = new MessageGll(nmea);
    expect(m).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.lat).toBeTruthy();
    expect(m.ns).toEqual(Ns.N);
    expect(m.ns).toEqual(Ns.N);
    expect(m.lon).toBeTruthy();
    expect(m.lon).toBeTruthy();
    expect(m.ew).toEqual(Ew.E);
    expect(m.ew).toEqual(Ew.E);
    expect(m.time).toBeTruthy();
    expect(m.time).toBeTruthy();
    expect(m.status).toBeTruthy('A');
    expect(m.status).toBeTruthy('A');
    expect(m.posMode).toBeTruthy('A');
    expect(m.posMode).toBeTruthy('A');
  });

  it('should error on parse method.', () => {
    try {
      const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
      const nmea = new NmeaGps(input);
      spyOnProperty(nmea, 'splitted', 'get').and.returnValue(undefined);
      // tslint:disable-next-line: no-unused-expression
      new MessageGll(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
