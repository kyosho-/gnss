import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableInteger } from '../util/cacheable-integer';
import { CacheableIntegerArray } from '../util/cacheable-integer-array';
import { CacheableFloat } from '../util/cacheable-float';

export class MessageGsa extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GSA;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 18;

    private opModeCache: string;
    private navModeCache: CacheableInteger;
    private svidCache: CacheableIntegerArray;
    private pdopCache: CacheableFloat;
    private hdopCache: CacheableFloat;
    private vdopCache: CacheableFloat;
    private systemIdCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageGsa.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.opModeCache = fields[0];
        this.navModeCache = new CacheableInteger(fields[1]);
        this.svidCache = new CacheableIntegerArray(fields.slice(2, 14));
        this.pdopCache = new CacheableFloat(fields[14]);
        this.hdopCache = new CacheableFloat(fields[15]);
        this.vdopCache = new CacheableFloat(fields[16]);
        this.systemIdCache = new CacheableInteger(fields[17]);
    }

    get opMode(): string { return this.opModeCache; }
    get navMode(): number { return this.navModeCache.value; }
    get svid(): number[] { return this.svidCache.value; }
    get pdop(): number { return this.pdopCache.value; }
    get hdop(): number { return this.hdopCache.value; }
    get vdop(): number { return this.vdopCache.value; }
    get systemId(): number { return this.systemIdCache.value; }
}
