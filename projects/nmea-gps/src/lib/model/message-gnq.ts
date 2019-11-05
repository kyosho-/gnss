import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export class MessageGnq extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GNQ;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 1;

    private msgIdCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGnq.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.msgIdCache = fields[0];
    }

    get msgId(): string { return this.msgIdCache; }
}
