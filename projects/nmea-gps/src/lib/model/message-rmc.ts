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
import { DoWhileStatement } from 'estree';
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

        if (fields.length !== MessageRmc.FIELD_NUM && fields.length !== MessageRmc.FIELD_NUM_410) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.statusCache = fields[1];
        this.latCache = new CacheableDm(fields[3], fields[2]);
        this.nsCache = new CacheableNs(fields[3]);
        this.lonCache = new CacheableDm(fields[5], fields[4]);
        this.ewCache = new CacheableEw(fields[5]);
        this.spdCache = new CacheableFloat(fields[6]);
        this.cogCache = new CacheableFloat(fields[7]);
        this.dateCache = new CacheableYmd(fields[8]);
        this.mvCache = new CacheableFloat(fields[9]);
        this.mvEwCache = fields[10];
        this.posModeCache = fields[11];
        if (fields.length === MessageRmc.FIELD_NUM_410) {
            this.navStatusCache = fields[12];
        }
    }

    get time(): Time { return this.timeCache.value; }
    get status(): string { return this.statusCache; }
    get lat(): Dm { return this.latCache.value; }
    get ns(): Ns { return this.nsCache.value; }
    get lon(): Dm { return this.lonCache.value; }
    get ew(): Ew { return this.ewCache.value; }
    get spd(): number { return this.spdCache.value; }
    get cog(): number { return this.cogCache.value; }
    get date(): Ymd { return this.dateCache.value; }
    get mv(): number { return this.mvCache.value; }
    get mvEw(): string { return this.mvEwCache; }
    get posMode(): string { return this.posModeCache; }
    get navStatus(): string { return this.navStatusCache; }
}
