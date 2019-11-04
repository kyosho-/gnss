import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { Time } from './time';
import { CacheableFloat } from '../util/cacheable-float';
import { CacheableInteger } from '../util/cacheable-integer';
import { CacheableTime } from '../util/cacheable-time';

export class MessageGbs extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GBS;

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 10;

    private timeCache: CacheableTime;
    private errLatCache: CacheableFloat;
    private errLonCache: CacheableFloat;
    private errAltCache: CacheableFloat;
    private svidCache: CacheableInteger;
    private probCache: CacheableInteger;
    private biasCache: CacheableFloat;
    private stddevCache: CacheableFloat;
    private systemIdCache: CacheableInteger;
    private signalIdCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageGbs.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.errLatCache = new CacheableFloat(fields[1]);
        this.errLonCache = new CacheableFloat(fields[2]);
        this.errAltCache = new CacheableFloat(fields[3]);
        this.svidCache = new CacheableInteger(fields[4]);
        this.probCache = new CacheableInteger(fields[5]);
        this.biasCache = new CacheableFloat(fields[6]);
        this.stddevCache = new CacheableFloat(fields[7]);
        this.systemIdCache = new CacheableInteger(fields[8]);
        this.signalIdCache = new CacheableInteger(fields[9]);
    }

    get time(): Time { return this.timeCache.value; }
    get errLat(): number { return this.errLatCache.value; }
    get errLon(): number { return this.errLonCache.value; }
    get errAlt(): number { return this.errAltCache.value; }
    get svid(): number { return this.svidCache.value; }
    get prob(): number { return this.probCache.value; }
    get bias(): number { return this.biasCache.value; }
    get stddev(): number { return this.stddevCache.value; }
    get systemId(): number { return this.systemIdCache.value; }
    get signalId(): number { return this.signalIdCache.value; }
}
