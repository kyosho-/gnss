import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableInteger } from '../util/cacheable-integer';
import { CacheableIntegerArray } from '../util/cacheable-integer-array';
import { CacheableFloat } from '../util/cacheable-float';

export class MessageGsa extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GSA;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 18;

    private fields: string[];

    private opModeCache: string;
    private navModeCache: CacheableInteger;
    private svidCache: CacheableIntegerArray;
    private pdopCache: CacheableFloat;
    private hdopCache: CacheableFloat;
    private vdopCache: CacheableFloat;
    private systemIdCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGsa.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get opMode(): string {
        if (undefined === this.opModeCache) {
            this.opModeCache = this.fields[0];
        }
        return this.opModeCache;
    }
    get navMode(): number {
        if (undefined === this.navModeCache) {
            this.navModeCache = new CacheableInteger(this.fields[1]);
        }
        return this.navModeCache.value;
    }
    get svid(): number[] {
        if (undefined === this.svidCache) {
            this.svidCache = new CacheableIntegerArray(this.fields.slice(2, 14));
        }
        return this.svidCache.value;
    }
    get pdop(): number {
        if (undefined === this.pdopCache) {
            this.pdopCache = new CacheableFloat(this.fields[14]);
        }
        return this.pdopCache.value;
    }
    get hdop(): number {
        if (undefined === this.hdopCache) {
            this.hdopCache = new CacheableFloat(this.fields[15]);
        }
        return this.hdopCache.value;
    }
    get vdop(): number {
        if (undefined === this.vdopCache) {
            this.vdopCache = new CacheableFloat(this.fields[16]);
        }
        return this.vdopCache.value;
    }
    get systemId(): number {
        if (undefined === this.systemIdCache) {
            this.systemIdCache = new CacheableInteger(this.fields[17]);
        }
        return this.systemIdCache.value;
    }
}
