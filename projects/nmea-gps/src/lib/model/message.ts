import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

/**
 * ![UML](media://class-message.png)
 */
export class Message {
    private talkerIdCache: TalkerId;
    private messageIdCache: MessageId;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId) {
        this.talkerIdCache = talkerId;
        this.messageIdCache = messageId;
    }

    get talkerId(): TalkerId { return this.talkerIdCache; }
    get messageId(): MessageId { return this.messageIdCache; }
}
