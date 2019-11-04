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

        if (fields.length !== MessageGns.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.latCache = new CacheableDm(fields[2], fields[1]);
        this.nsCache = new CacheableNs(fields[2]);
        this.lonCache = new CacheableDm(fields[4], fields[3]);
        this.ewCache = new CacheableEw(fields[4]);
        this.posModeCache = fields[5];
        this.numSvCache = new CacheableInteger(fields[6]);
        this.hdopCache = new CacheableFloat(fields[7]);
        this.altCache = new CacheableFloat(fields[8]);
        this.sepCache = new CacheableFloat(fields[9]);
        this.diffAgeCache = new CacheableInteger(fields[10]);
        this.diffStationCache = new CacheableInteger(fields[11]);
        this.navStatusCache = fields[12];
    }

    get time(): Time { return this.timeCache.value; }
    get lat(): Dm { return this.latCache.value; }
    get ns(): Ns { return this.nsCache.value; }
    get lon(): Dm { return this.lonCache.value; }
    get ew(): Ew { return this.ewCache.value; }
    get posMode(): string { return this.posModeCache; }
    get numSv(): number { return this.numSvCache.value; }
    get hdop(): number { return this.hdopCache.value; }
    get alt(): number { return this.altCache.value; }
    get sep(): number { return this.sepCache.value; }
    get diffAge(): number { return this.diffAgeCache.value; }
    get diffStation(): number { return this.diffStationCache.value; }
    get navStatus(): string { return this.navStatusCache; }
}
