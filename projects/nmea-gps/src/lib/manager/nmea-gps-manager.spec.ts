import { NmeaGpsManager } from './nmea-gps-manager';
import { TalkerId, MessageId } from '../type';
import { Message } from '../message';

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

  it('should be undefined.', () => {
    const manager = new NmeaGpsManager();
    const message = manager.update(undefined);
    expect(message).toBeUndefined();
  });

  it('should be null.', () => {
    const manager = new NmeaGpsManager();
    const message = manager.update(null);
    expect(message).toBeNull();
  });

  function check(m: Message, tid: TalkerId, mid: MessageId, updated: Message) {
    expect(m).toBeTruthy();
    expect(m.talkerId).toEqual(tid);
    expect(m.messageId).toEqual(mid);
    expect(updated.talkerId).toEqual(tid);
    expect(updated.messageId).toEqual(mid);
    expect(updated.value).toEqual(m.value);
  }

  it('should update messages.', () => {
    const manager = new NmeaGpsManager();
    // DTM
    let line = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    let m = manager.update(line);
    check(m, TalkerId.GP, MessageId.DTM, manager.dtm);
    // GBQ
    line = '$GNGBQ,RMC*2D\r\n';
    m = manager.update(line);
    check(m, TalkerId.GN, MessageId.GBQ, manager.gbq);
    // GBS
    line = '$GPGBS,235503.00,1.6,1.4,3.2,,,,,,*40\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GBS, manager.gbs);
    // GGA
    line = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,08,1.01,499.6,M,48.0,M,,*5B';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GGA, manager.gga);
    // GLL
    line = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GLL, manager.gll);
    // GLQ
    line = '$GPGLQ,RMC*3D';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GLQ, manager.glq);
    // GNQ
    line = '$GPGNQ,RMC*3F\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GNQ, manager.gnq);
    // GNS
    line = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    m = manager.update(line);
    check(m, TalkerId.GN, MessageId.GNS, manager.gns);
    // GPQ
    line = '$GPGPQ,RMC*21\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GPQ, manager.gpq);
    // GRS
    line = '$GNGRS,104148.00,1,,0.0,2.5,0.0,,2.8,,,,,,,1,5*51\r\n';
    m = manager.update(line);
    check(m, TalkerId.GN, MessageId.GRS, manager.grs);
    // GSA
    line = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54,1*10\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GSA, manager.gsa);
    // GST
    line = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GST, manager.gst);
    // GSV
    line = '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.GSV, manager.gsv);
    // RMC
    line = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.RMC, manager.rmc);
    // TXT
    line = '$GPTXT,01,01,02,ANTARIS ATR0620 HW 00000040*67';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.TXT, manager.txt);
    // VLW
    line = '$GPVLW,,N,,N,15.8,N,1.2,N*65\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.VLW, manager.vlw);
    // VTG
    line = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.VTG, manager.vtg);
    // ZDA
    line = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    m = manager.update(line);
    check(m, TalkerId.GP, MessageId.ZDA, manager.zda);
    // other
    try {
      spyOnProperty(m, 'messageId', 'get').and.returnValue('XXX');
      m = manager.update(m);
    } catch (error) {
      expect(error.message).toEqual(
        `Unsupported message ID. (id=XXX)`);
    }
  });
});
