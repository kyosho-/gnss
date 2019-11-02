import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export interface Message {
    talkerId: TalkerId;
    messageId: MessageId;
}
