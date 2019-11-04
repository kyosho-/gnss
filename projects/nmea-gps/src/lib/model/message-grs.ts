import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableInteger } from '../util/cacheable-integer';
import { Time } from './time';
import { CacheableFloatArray } from '../util/cacheable-float-array';

export class MessageGrs extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GRS;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 16;
    static readonly RESIDUAL_NUM = 12;

    private timeCache: CacheableTime;
    private modeCache: CacheableInteger;
    private residualCache: CacheableFloatArray;
    private systemIdCache: CacheableInteger;
    private signalIdCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageGrs.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.modeCache = new CacheableInteger(fields[1]);
        this.residualCache = new CacheableFloatArray(fields.slice(2, 14));
        this.systemIdCache = new CacheableInteger(fields[14]);
        this.signalIdCache = new CacheableInteger(fields[15]);
    }

    get time(): Time { return this.timeCache.value; }
    get mode(): number { return this.modeCache.value; }
    get residual(): number[] { return this.residualCache.value; }
    get systemId(): number { return this.systemIdCache.value; }
    get signalId(): number { return this.signalIdCache.value; }
}
