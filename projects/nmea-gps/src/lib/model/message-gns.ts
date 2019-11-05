import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableDm } from '../util/cacheable-dm';
import { CacheableNs } from '../util/cacheable-ns';
import { CacheableEw } from '../util/cacheable-ew';
import { CacheableInteger } from '../util/cacheable-integer';
import { CacheableFloat } from '../util/cacheable-float';
import { Time } from './time';
import { Dm } from './dm';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

export class MessageGns extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GNS;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 13;

    private fields: string[];

    private timeCache: CacheableTime;
    private latCache: CacheableDm;
    private nsCache: CacheableNs;
    private lonCache: CacheableDm;
    private ewCache: CacheableEw;
    private posModeCache: string;
    private numSvCache: CacheableInteger;
    private hdopCache: CacheableFloat;
    private altCache: CacheableFloat;
    private sepCache: CacheableFloat;
    private diffAgeCache: CacheableInteger;
    private diffStationCache: CacheableInteger;
    private navStatusCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGns.FIELD_NUM) {
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
    get lat(): Dm {
        if (undefined === this.latCache) {
            this.latCache = new CacheableDm(this.fields[2], this.fields[1]);
        }
        return this.latCache.value;
    }
    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = new CacheableNs(this.fields[2]);
        }
        return this.nsCache.value;
    }
    get lon(): Dm {
        if (undefined === this.lonCache) {
            this.lonCache = new CacheableDm(this.fields[4], this.fields[3]);
        }
        return this.lonCache.value;
    }
    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = new CacheableEw(this.fields[4]);
        }
        return this.ewCache.value;
    }
    get posMode(): string {
        if (undefined === this.posModeCache) {
            this.posModeCache = this.fields[5];
        }
        return this.posModeCache;
    }
    get numSv(): number {
        if (undefined === this.numSvCache) {
            this.numSvCache = new CacheableInteger(this.fields[6]);
        }
        return this.numSvCache.value;
    }
    get hdop(): number {
        if (undefined === this.hdopCache) {
            this.hdopCache = new CacheableFloat(this.fields[7]);
        }
        return this.hdopCache.value;
    }
    get alt(): number {
        if (undefined === this.altCache) {
            this.altCache = new CacheableFloat(this.fields[8]);
        }
        return this.altCache.value;
    }
    get sep(): number {
        if (undefined === this.sepCache) {
            this.sepCache = new CacheableFloat(this.fields[9]);
        }
        return this.sepCache.value;
    }
    get diffAge(): number {
        if (undefined === this.diffAgeCache) {
            this.diffAgeCache = new CacheableInteger(this.fields[10]);
        }
        return this.diffAgeCache.value;
    }
    get diffStation(): number {
        if (undefined === this.diffStationCache) {
            this.diffStationCache = new CacheableInteger(this.fields[11]);
        }
        return this.diffStationCache.value;
    }
    get navStatus(): string {
        if (undefined === this.navStatusCache) {
            this.navStatusCache = this.fields[12];
        }
        return this.navStatusCache;
    }
}
