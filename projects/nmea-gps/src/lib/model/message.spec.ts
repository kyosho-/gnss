import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { NmeaGps } from '../nmea-gps';

describe('Satellite', () => {
  it('should create an instance', () => {
    const input = '$GPZDA,082710.00,16,09,2002,00,00*64\r\n';
    const nmea = new NmeaGps(input);

    const target = new Message(nmea);
    expect(target).toBeTruthy();
    expect(target.talkerId).toEqual(TalkerId.GA);
    expect(target.messageId).toEqual(MessageId.DTM);
  });
});
