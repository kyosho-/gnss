import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableInteger } from '../util/cacheable-integer';
import { Time } from './time';

export class MessageZda extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.ZDA;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 6;

    private fields: string[];

    private timeCache: CacheableTime;
    private dayCache: CacheableInteger;
    private monthCache: CacheableInteger;
    private yearCache: CacheableInteger;
    private ltzhCache: CacheableInteger;
    private ltznCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageZda.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = new CacheableTime(this.fields[0]);
        }
        return this.timeCache.value;
    }
    get day(): number {
        if (undefined === this.dayCache) {
            this.dayCache = new CacheableInteger(this.fields[1]);
        }
        return this.dayCache.value;
    }
    get month(): number {
        if (undefined === this.monthCache) {
            this.monthCache = new CacheableInteger(this.fields[2]);
        }
        return this.monthCache.value;
    }
    get year(): number {
        if (undefined === this.yearCache) {
            this.yearCache = new CacheableInteger(this.fields[3]);
        }
        return this.yearCache.value;
    }
    get ltzh(): number {
        if (undefined === this.ltzhCache) {
            this.ltzhCache = new CacheableInteger(this.fields[4]);
        }
        return this.ltzhCache.value;
    }
    get ltzn(): number {
        if (undefined === this.ltznCache) {
            this.ltznCache = new CacheableInteger(this.fields[5]);
        }
        return this.ltznCache.value;
    }
}
