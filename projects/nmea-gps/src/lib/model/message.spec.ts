import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

describe('Satellite', () => {
  it('should create an instance', () => {
    const target = new Message(TalkerId.GA, MessageId.DTM);
    expect(target).toBeTruthy();
    expect(target.talkerId).toEqual(TalkerId.GA);
    expect(target.messageId).toEqual(MessageId.DTM);
  });
});
