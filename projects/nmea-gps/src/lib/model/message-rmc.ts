import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableFloat } from '../util/cacheable-float';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableDm } from '../util/cacheable-dm';
import { CacheableNs } from '../util/cacheable-ns';
import { CacheableEw } from '../util/cacheable-ew';
import { CacheableYmd } from '../util/cacheable-ymd';
import { Time } from './time';
import { Dm } from './dm';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';
import { Ymd } from './ymd';

export class MessageRmc extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.RMC;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 12;
    static readonly FIELD_NUM_410 = 13;

    private fields: string[];

    private timeCache: CacheableTime;
    private statusCache: string;
    private latCache: CacheableDm;
    private nsCache: CacheableNs;
    private lonCache: CacheableDm;
    private ewCache: CacheableEw;
    private spdCache: CacheableFloat;
    private cogCache: CacheableFloat;
    private dateCache: CacheableYmd;
    private mvCache: CacheableFloat;
    private mvEwCache: string;
    private posModeCache: string;
    private navStatusCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || (fields.length !== MessageRmc.FIELD_NUM && fields.length !== MessageRmc.FIELD_NUM_410)) {
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
    get status(): string {
        if (undefined === this.statusCache) {
            this.statusCache = this.fields[1];
        }
        return this.statusCache;
    }
    get lat(): Dm {
        if (undefined === this.latCache) {
            this.latCache = new CacheableDm(this.fields[3], this.fields[2]);
        }
        return this.latCache.value;
    }
    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = new CacheableNs(this.fields[3]);
        }
        return this.nsCache.value;
    }
    get lon(): Dm {
        if (undefined === this.lonCache) {
            this.lonCache = new CacheableDm(this.fields[5], this.fields[4]);
        }
        return this.lonCache.value;
    }
    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = new CacheableEw(this.fields[5]);
        }
        return this.ewCache.value;
    }
    get spd(): number {
        if (undefined === this.spdCache) {
            this.spdCache = new CacheableFloat(this.fields[6]);
        }
        return this.spdCache.value;
    }
    get cog(): number {
        if (undefined === this.cogCache) {
            this.cogCache = new CacheableFloat(this.fields[7]);
        }
        return this.cogCache.value;
    }
    get date(): Ymd {
        if (undefined === this.dateCache) {
            this.dateCache = new CacheableYmd(this.fields[8]);
        }
        return this.dateCache.value;
    }
    get mv(): number {
        if (undefined === this.mvCache) {
            this.mvCache = new CacheableFloat(this.fields[9]);
        }
        return this.mvCache.value;
    }
    get mvEw(): string {
        if (undefined === this.mvEwCache) {
            this.mvEwCache = this.fields[10];
        }
        return this.mvEwCache;
    }
    get posMode(): string {
        if (undefined === this.posModeCache) {
            this.posModeCache = this.fields[11];
        }
        return this.posModeCache;
    }
    get navStatus(): string {
        if (this.fields.length === MessageRmc.FIELD_NUM_410) {
            this.navStatusCache = this.fields[12];
        }
        return this.navStatusCache;
    }
}
