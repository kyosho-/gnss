import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableNs } from '../util/cacheable-ns';
import { CacheableEw } from '../util/cacheable-ew';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableDm } from '../util/cacheable-dm';
import { CacheableInteger } from '../util/cacheable-integer';
import { CacheableFloat } from '../util/cacheable-float';
import { Time } from './time';
import { Dm } from './dm';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';

export class MessageGga extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GGA;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 14;

    private timeCache: CacheableTime;
    private latCache: CacheableDm;
    private nsCache: CacheableNs;
    private lonCache: CacheableDm;
    private ewCache: CacheableEw;
    private qualityCache: CacheableInteger;
    private numSvCache: CacheableInteger;
    private hdopCache: CacheableFloat;
    private altCache: CacheableFloat;
    private altUnitCache: string;
    private sepCache: CacheableFloat;
    private sepUnitCache: string;
    private diffAgeCache: CacheableFloat;
    private diffStationCache: CacheableFloat;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageGga.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.latCache = new CacheableDm(fields[2], fields[1]);
        this.nsCache = new CacheableNs(fields[2]);
        this.lonCache = new CacheableDm(fields[4], fields[3]);
        this.ewCache = new CacheableEw(fields[4]);
        this.qualityCache = new CacheableInteger(fields[5]);
        this.numSvCache = new CacheableInteger(fields[6]);
        this.hdopCache = new CacheableFloat(fields[7]);
        this.altCache = new CacheableFloat(fields[8]);
        this.altUnitCache = fields[9];
        this.sepCache = new CacheableFloat(fields[10]);
        this.sepUnitCache = fields[11];
        this.diffAgeCache = new CacheableFloat(fields[12]);
        this.diffStationCache = new CacheableFloat(fields[13]);
    }

    get time(): Time { return this.timeCache.value; }
    get lat(): Dm { return this.latCache.value; }
    get ns(): Ns { return this.nsCache.value; }
    get lon(): Dm { return this.lonCache.value; }
    get ew(): Ew { return this.ewCache.value; }
    get quality(): number { return this.qualityCache.value; }
    get numSv(): number { return this.numSvCache.value; }
    get hdop(): number { return this.hdopCache.value; }
    get alt(): number { return this.altCache.value; }
    get altUnit(): string { return this.altUnitCache; }
    get sep(): number { return this.sepCache.value; }
    get sepUnit(): string { return this.sepUnitCache; }
    get diffAge(): number { return this.diffAgeCache.value; }
    get diffStation(): number { return this.diffStationCache.value; }
}
