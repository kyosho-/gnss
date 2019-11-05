import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableDm } from '../util/cacheable-dm';
import { CacheableNs } from '../util/cacheable-ns';
import { CacheableEw } from '../util/cacheable-ew';
import { Ns } from './ns.enum';
import { Dm } from './dm';
import { Ew } from './ew.enum';
import { Time } from './time';

export class MessageGll extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GLL;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 7;

    private fields: string[];

    private latCache: CacheableDm;
    private nsCache: CacheableNs;
    private lonCache: CacheableDm;
    private ewCache: CacheableEw;
    private timeCache: CacheableTime;
    private statusCache: string;
    private posModeCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGll.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get lat(): Dm {
        if (undefined === this.latCache) {
            this.latCache = new CacheableDm(this.fields[1], this.fields[0]);
        }
        return this.latCache.value;
    }
    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = new CacheableNs(this.fields[1]);
        }
        return this.nsCache.value;
    }
    get lon(): Dm {
        if (undefined === this.lonCache) {
            this.lonCache = new CacheableDm(this.fields[3], this.fields[2]);
        }
        return this.lonCache.value;
    }
    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = new CacheableEw(this.fields[3]);
        }
        return this.ewCache.value;
    }
    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = new CacheableTime(this.fields[4]);
        }
        return this.timeCache.value;
    }
    get status(): string {
        if (undefined === this.statusCache) {
            this.statusCache = this.fields[5];
        }
        return this.statusCache;
    }
    get posMode(): string {
        if (undefined === this.posModeCache) {
            this.posModeCache = this.fields[6];
        }
        return this.posModeCache;
    }
}
