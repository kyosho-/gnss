import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

/**
 * ![UML](media://class-message.png)
 */
export interface Message {
    talkerId: TalkerId;
    messageId: MessageId;
}
