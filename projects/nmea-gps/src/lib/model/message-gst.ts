import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableFloat } from '../util/cacheable-float';
import { Time } from './time';

export class MessageGst extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GST;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private fields: string[];

    private timeCache: CacheableTime;
    private rangeRmsCache: CacheableFloat;
    private stdMajorCache: CacheableFloat;
    private stdMinorCache: CacheableFloat;
    private orientCache: CacheableFloat;
    private stdLatCache: CacheableFloat;
    private stdLongCache: CacheableFloat;
    private stdAltCache: CacheableFloat;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGst.FIELD_NUM) {
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
    get rangeRms(): number {
        if (undefined === this.rangeRmsCache) {
            this.rangeRmsCache = new CacheableFloat(this.fields[1]);
        }
        return this.rangeRmsCache.value;
    }
    get stdMajor(): number {
        if (undefined === this.stdMajorCache) {
            this.stdMajorCache = new CacheableFloat(this.fields[2]);
        }
        return this.stdMajorCache.value;
    }
    get stdMinor(): number {
        if (undefined === this.stdMinorCache) {
            this.stdMinorCache = new CacheableFloat(this.fields[3]);
        }
        return this.stdMinorCache.value;
    }
    get orient(): number {
        if (undefined === this.orientCache) {
            this.orientCache = new CacheableFloat(this.fields[4]);
        }
        return this.orientCache.value;
    }
    get stdLat(): number {
        if (undefined === this.stdLatCache) {
            this.stdLatCache = new CacheableFloat(this.fields[5]);
        }
        return this.stdLatCache.value;
    }
    get stdLong(): number {
        if (undefined === this.stdLongCache) {
            this.stdLongCache = new CacheableFloat(this.fields[6]);
        }
        return this.stdLongCache.value;
    }
    get stdAlt(): number {
        if (undefined === this.stdAltCache) {
            this.stdAltCache = new CacheableFloat(this.fields[7]);
        }
        return this.stdAltCache.value;
    }
}
