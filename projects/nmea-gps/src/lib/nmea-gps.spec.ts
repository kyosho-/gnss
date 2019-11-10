import { NmeaGps } from './nmea-gps';
import { TalkerId, MessageId } from './type';

describe('NmeaGps', () => {
  it('should create an instance', () => {
    const line = '$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r\n';
    let actual = new NmeaGps(line);
    expect(actual).toBeTruthy();
    expect(actual.talkerId).toEqual(TalkerId.GN);
    expect(actual.messageId).toEqual(MessageId.TXT);

    actual = new NmeaGps(line);
    expect(actual).toBeTruthy();
    expect(actual.messageId).toEqual(MessageId.TXT);
    expect(actual.talkerId).toEqual(TalkerId.GN);
  });

  it('should get undefined.', () => {
    const line = undefined;
    const actual = new NmeaGps(line);
    expect(actual).toBeTruthy();
  });

  it('should update lines', () => {
    const line = '$GNTXT,01,01,02,u-blox AG - www.u-blox.com*4E\r\n';
    const actual = new NmeaGps(line);
    spyOnProperty(actual, 'address', 'get').and.returnValue('12345');
    expect(actual).toBeTruthy();

    try {
      // tslint:disable-next-line: no-unused-expression
      actual.talkerId;
      fail();
    } catch (error) {
      expect(error.message).toEqual(`Parse error. (address=12345)`);
    }
  });
});
