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

        if (fields.length !== MessageGll.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.latCache = new CacheableDm(fields[1], fields[0]);
        this.nsCache = new CacheableNs(fields[1]);
        this.lonCache = new CacheableDm(fields[3], fields[2]);
        this.ewCache = new CacheableEw(fields[3]);
        this.timeCache = new CacheableTime(fields[4]);
        this.statusCache = fields[5];
        this.posModeCache = fields[6];
    }

    get lat(): Dm { return this.latCache.value; }
    get ns(): Ns { return this.nsCache.value; }
    get lon(): Dm { return this.lonCache.value; }
    get ew(): Ew { return this.ewCache.value; }
    get time(): Time { return this.timeCache.value; }
    get status(): string { return this.statusCache; }
    get posMode(): string { return this.posModeCache; }
}
