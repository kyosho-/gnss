import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableInteger } from '../util/cacheable-integer';
import { Time } from './time';
import { CacheableFloatArray } from '../util/cacheable-float-array';

export class MessageGrs extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GRS;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 16;
    static readonly RESIDUAL_NUM = 12;

    private fields: string[];

    private timeCache: CacheableTime;
    private modeCache: CacheableInteger;
    private residualCache: CacheableFloatArray;
    private systemIdCache: CacheableInteger;
    private signalIdCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGrs.FIELD_NUM) {
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
    get mode(): number {
        if (undefined === this.modeCache) {
            this.modeCache = new CacheableInteger(this.fields[1]);
        }
        return this.modeCache.value;
    }
    get residual(): number[] {
        if (undefined === this.residualCache) {
            this.residualCache = new CacheableFloatArray(this.fields.slice(2, 14));
        }
        return this.residualCache.value;
    }
    get systemId(): number {
        if (undefined === this.systemIdCache) {
            this.systemIdCache = new CacheableInteger(this.fields[14]);
        }
        return this.systemIdCache.value;
    }
    get signalId(): number {
        if (undefined === this.signalIdCache) {
            this.signalIdCache = new CacheableInteger(this.fields[15]);
        }
        return this.signalIdCache.value;
    }
}
