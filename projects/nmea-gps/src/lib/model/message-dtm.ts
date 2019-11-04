import { Message } from './message';
import { Datum } from './datum.enum';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';
import { CacheableDatum } from '../util/cacheable-datum';
import { CacheableFloat } from '../util/cacheable-float';
import { CacheableEw } from '../util/cacheable-ew';
import { CacheableNs } from '../util/cacheable-ns';

export class MessageDtm extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.DTM;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private datumCache: CacheableDatum;
    private subDatumCache: string;
    private latCache: CacheableFloat;
    private nsCache: CacheableNs;
    private lonCache: CacheableFloat;
    private ewCache: CacheableEw;
    private altCache: CacheableFloat;
    private refDatumCache: CacheableDatum;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageDtm.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.datumCache = new CacheableDatum(fields[0]);
        this.subDatumCache = fields[1];
        this.latCache = new CacheableFloat(fields[2]);
        this.nsCache = new CacheableNs(fields[3]);
        this.lonCache = new CacheableFloat(fields[4]);
        this.ewCache = new CacheableEw(fields[5]);
        this.altCache = new CacheableFloat(fields[6]);
        this.refDatumCache = new CacheableDatum(fields[7]);
    }

    get datum(): Datum { return this.datumCache.value; }
    get subDatum(): string { return this.subDatumCache; }
    get lat(): number { return this.latCache.value; }
    get ns(): Ns { return this.nsCache.value; }
    get lon(): number { return this.lonCache.value; }
    get ew(): Ew { return this.ewCache.value; }
    get alt(): number { return this.altCache.value; }
    get refDatum(): Datum { return this.refDatumCache.value; }
}
