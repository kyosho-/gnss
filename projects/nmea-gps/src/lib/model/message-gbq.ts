import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export class MessageGbq extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GBQ;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 1;

    private fields: string[];

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGbq.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get msgId(): string { return this.fields[0]; }
}
