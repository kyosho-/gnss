import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export interface MessageSummary {
    isStandard: boolean;
    talkerId?: TalkerId;
    messageId?: MessageId;
}
