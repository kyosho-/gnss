import { NmeaGps } from '../nmea-gps';
import { MessageTxt } from './message-txt';

describe('MessageTxt', () => {
  it('should create an instance', () => {
    let input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
    let nmea = new NmeaGps(input);
    let m = new MessageTxt(nmea);
    expect(m).toBeTruthy();
    expect(m.numMsg).toEqual(1);
    expect(m.numMsg).toEqual(1);
    expect(m.msgNum).toEqual(1);
    expect(m.msgNum).toEqual(1);
    expect(m.msgType).toEqual(2);
    expect(m.msgType).toEqual(2);
    expect(m.text).toEqual('u-blox ag - www.u-blox.com');
    expect(m.text).toEqual('u-blox ag - www.u-blox.com');


    input = '$GPTXT,01,01,02,ANTARIS ATR0620 HW 00000040*67';
    nmea = new NmeaGps(input);
    expect(new MessageTxt(nmea)).toBeTruthy();
  });

  it('should error on parse method.', () => {
    try {
      // const input = '$GPTXT,01,01,02,u-blox ag - www.u-blox.com*50\r\n';
      const input = '$GPDTM,W84,,0.0,N,0.0,E,0.0,W84*6F\r\n';
      const nmea = new NmeaGps(input);
      // tslint:disable-next-line: no-unused-expression
      new MessageTxt(nmea);
      fail();
    } catch (error) {
      // TODO: check message.
      expect(error).not.toBeUndefined();
    }
  });
});
