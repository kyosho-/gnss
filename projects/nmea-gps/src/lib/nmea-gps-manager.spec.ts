import { NmeaGpsManager } from './nmea-gps-manager';

describe('NmeaGpsManager', () => {
  it('should create an instance', () => {
    expect(new NmeaGpsManager()).toBeTruthy();
  });

  it('should get undefined.', () => {
    const manager = new NmeaGpsManager();
    expect(manager.dtm).toBeUndefined();
    expect(manager.gbq).toBeUndefined();
    expect(manager.gbs).toBeUndefined();
    expect(manager.gga).toBeUndefined();
    expect(manager.gll).toBeUndefined();
    expect(manager.glq).toBeUndefined();
    expect(manager.gnq).toBeUndefined();
    expect(manager.gns).toBeUndefined();
    expect(manager.gpq).toBeUndefined();
    expect(manager.grs).toBeUndefined();
    expect(manager.gsa).toBeUndefined();
    expect(manager.gst).toBeUndefined();
    expect(manager.gsv).toBeUndefined();
    expect(manager.rmc).toBeUndefined();
    expect(manager.txt).toBeUndefined();
    expect(manager.vlw).toBeUndefined();
    expect(manager.vtg).toBeUndefined();
    expect(manager.zda).toBeUndefined();
  });

  it('should update lines', () => {
    const manager = new NmeaGpsManager();
    const message = manager.update(undefined);
    expect(message).toBeUndefined();
  });
});
