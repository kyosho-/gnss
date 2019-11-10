import { Message } from './message';
import { TalkerId, MessageId } from '../type';
import { NmeaGps } from '../nmea-gps';

describe('Satellite', () => {
  it('should create an instance', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = new NmeaGps(input);

    const target = new Message(nmea);
    expect(target).toBeTruthy();
    expect(target.talkerId).toEqual(TalkerId.GP);
    expect(target.messageId).toEqual(MessageId.ZDA);
    expect(target.value).toEqual('082710.00,16,09,2002,00,00');
  });
});
