import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableInteger } from '../util/cacheable-integer';

export class MessageTxt extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.TXT;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 4;

    private fields: string[];

    private numMsgCache: CacheableInteger;
    private msgNumCache: CacheableInteger;
    private msgTypeCache: CacheableInteger;
    private textCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageTxt.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get numMsg(): number {
        if (undefined === this.numMsgCache) {
            this.numMsgCache = new CacheableInteger(this.fields[0]);
        }
        return this.numMsgCache.value;
    }
    get msgNum(): number {
        if (undefined === this.msgNumCache) {
            this.msgNumCache = new CacheableInteger(this.fields[1]);
        }
        return this.msgNumCache.value;
    }
    get msgType(): number {
        if (undefined === this.msgTypeCache) {
            this.msgTypeCache = new CacheableInteger(this.fields[2]);
        }
        return this.msgTypeCache.value;
    }
    get text(): string {
        if (undefined === this.textCache) {
            this.textCache = this.fields[3];
        }
        return this.textCache;
    }
}
