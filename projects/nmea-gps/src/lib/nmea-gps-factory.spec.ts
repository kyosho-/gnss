import { NmeaGpsFactory } from './nmea-gps-factory';
import { NmeaGps } from './nmea-gps';
import { MessageId } from './primitive-type';

describe('NmeaGpsFactory', () => {
  it('should error on constructor.', () => {
    try {
      const factory: NmeaGpsFactory = new NmeaGpsFactory();
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });

  it('should error on another nmea', () => {
    try {
      const input = '$PUBX,41,1,0007,0003,19200,0*25\r\n';
      NmeaGpsFactory.create(input);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });

  it('should create an DTM instance', () => {
    let input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
    let nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageDtm).toBeTruthy();
    input = '$GPDTM,999,,0.08,N,0.07,E,-47.7,W84*1B\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageDtm).toBeTruthy();
  });

  it('should create an GBQ instance', () => {
    const input = '$GPGBQ,RMC*33\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGbq).toBeTruthy();
  });

  it('should create an GBS instance', () => {
    let input = '$GPGBS,235503.00,1.6,1.4,3.2,,,,,,*40\r\n';
    let nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGbs).toBeTruthy();
    input = '$GPGBS,235458.00,1.4,1.3,3.1,03,,-21.4,3.8,1,0*5A\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGbs).toBeTruthy();
  });

  it('should create an GGA instance', () => {
    const input = '$GPGGA,092725.00,4717.11399,N,00833.91590,E,1,08,1.01,499.6,M,48.0,M,,*5B';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGga).toBeTruthy();
  });

  it('should create an GLL instance', () => {
    const input = '$GPGLL,4717.11364,N,00833.91565,E,092321.00,A,A*60\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGll).toBeTruthy();
  });

  it('should create an GLQ instance', () => {
    const input = '$GPGLQ,RMC*3D';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGlq).toBeTruthy();
  });

  it('should create an GNQ instance', () => {
    const input = '$GPGNQ,RMC*3F\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGnq).toBeTruthy();
  });

  it('should create an GNS instance', () => {
    let input = '$GNGNS,103600.01,5114.51176,N,00012.29380,W,ANNN,07,1.18,111.5,45.6,,,V*00\r\n';
    let nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGns).toBeTruthy();
    input = '$GNGNS,122310.2,3722.425671,N,12258.856215,W,DAAA,14,0.9,1005.543,6.5,,,V*0B\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGns).toBeTruthy();
    input = '$GPGNS,122310.2,,,,,,07,,,,5.2,23,V*07\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGns).toBeTruthy();
  });

  it('should create an GPQ instance', () => {
    const input = '$GPGPQ,RMC*21\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGpq).toBeTruthy();
  });

  it('should create an GRS instance', () => {
    let input = '$GNGRS,104148.00,1,2.6,2.2,-1.6,-1.1,-1.7,-1.5,5.8,1.7,,,,,1,1*52\r\n';
    let nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGrs).toBeTruthy();
    input = '$GNGRS,104148.00,1,,0.0,2.5,0.0,,2.8,,,,,,,1,5*51\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGrs).toBeTruthy();
  });

  it('should create an GSA instance', () => {
    const input = '$GPGSA,A,3,23,29,07,08,09,18,26,28,,,,,1.94,1.18,1.54,1*10\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGsa).toBeTruthy();
  });

  it('should create an GST instance', () => {
    const input = '$GPGST,082356.00,1.8,,,,1.7,1.3,2.2*7E\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGst).toBeTruthy();
  });

  it('should create an GSV instance', () => {
    let input = '$GPGSV,3,1,09,09,,,17,10,,,40,12,,,49,13,,,35,1*6F\r\n';
    let nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGsv).toBeTruthy();
    input = '$GPGSV,3,2,09,15,,,44,17,,,45,19,,,44,24,,,50,1*64\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGsv).toBeTruthy();
    input = '$GPGSV,3,3,09,25,,,40,1*6E\r\n';
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGsv).toBeTruthy();
    input = '$GPGSV,1,1,03,12,,,42,24,,,47,32,,,37,5*66\r\n';
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGsv).toBeTruthy();
    input = '$GAGSV,1,1,00,2*76\r\n';
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageGsv).toBeTruthy();
  });

  it('should create an RMC instance', () => {
    const input = '$GPRMC,083559.00,A,4717.11437,N,00833.91522,E,0.004,77.52,091202,,,A,V*2D\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageRmc).toBeTruthy();
  });

  it('should create an TXT instance', () => {
    let input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
    let nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageTxt).toBeTruthy();
    input = '$GPTXT,01,01,02,ANTARIS ATR0620 HW 00000040*67\r\n';
    nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageTxt).toBeTruthy();
  });

  it('should create an VLW instance', () => {
    const input = '$GPVLW,,N,,N,15.8,N,1.2,N*65\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageVlw).toBeTruthy();
  });

  it('should create an VTG instance', () => {
    const input = '$GPVTG,77.52,T,,M,0.004,N,0.008,K,A*06\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageVtg).toBeTruthy();
  });

  it('should create an ZDA instance', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = NmeaGpsFactory.create(input);
    expect(nmea).toBeTruthy();
    // expect(nmea instanceof MessageZda).toBeTruthy();
  });

  it('should be error on undefined.', () => {
    try {
      const input = undefined;
      NmeaGpsFactory.create(input);
    } catch (error) {
      expect(error.message).toEqual('line is undefined. (line=undefined)');
    }
  });

  it('should create ZDA from string', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = new NmeaGps(input);
    const actual = NmeaGpsFactory.create(nmea);
    expect(actual.messageId).toEqual(MessageId.ZDA);
  });

  it('should be error on unsupported MessageId', () => {
    try {
      const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
      const nmea = new NmeaGps(input);
      spyOnProperty(nmea, 'messageId', 'get').and.returnValue('XXX');
      NmeaGpsFactory.create(nmea);
    } catch (error) {
      expect(error.message).toEqual(`Unsupported message ID. (id=XXX)`);
    }
  });
});
