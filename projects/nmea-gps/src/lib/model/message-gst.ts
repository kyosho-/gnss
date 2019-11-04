import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableFloat } from '../util/cacheable-float';
import { Time } from './time';

export class MessageGst extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GST;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private timeCache: CacheableTime;
    private rangeRmsCache: CacheableFloat;
    private stdMajorCache: CacheableFloat;
    private stdMinorCache: CacheableFloat;
    private orientCache: CacheableFloat;
    private stdLatCache: CacheableFloat;
    private stdLongCache: CacheableFloat;
    private stdAltCache: CacheableFloat;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageGst.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.rangeRmsCache = new CacheableFloat(fields[1]);
        this.stdMajorCache = new CacheableFloat(fields[2]);
        this.stdMinorCache = new CacheableFloat(fields[3]);
        this.orientCache = new CacheableFloat(fields[4]);
        this.stdLatCache = new CacheableFloat(fields[5]);
        this.stdLongCache = new CacheableFloat(fields[6]);
        this.stdAltCache = new CacheableFloat(fields[7]);
    }

    get time(): Time { return this.timeCache.value; }
    get rangeRms(): number { return this.rangeRmsCache.value; }
    get stdMajor(): number { return this.stdMajorCache.value; }
    get stdMinor(): number { return this.stdMinorCache.value; }
    get orient(): number { return this.orientCache.value; }
    get stdLat(): number { return this.stdLatCache.value; }
    get stdLong(): number { return this.stdLongCache.value; }
    get stdAlt(): number { return this.stdAltCache.value; }
}
