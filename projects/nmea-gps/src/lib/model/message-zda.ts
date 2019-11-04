import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableTime } from '../util/cacheable-time';
import { CacheableInteger } from '../util/cacheable-integer';
import { Time } from './time';

export class MessageZda extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.ZDA;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 6;

    private timeCache: CacheableTime;
    private dayCache: CacheableInteger;
    private monthCache: CacheableInteger;
    private yearCache: CacheableInteger;
    private ltzhCache: CacheableInteger;
    private ltznCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageZda.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.timeCache = new CacheableTime(fields[0]);
        this.dayCache = new CacheableInteger(fields[1]);
        this.monthCache = new CacheableInteger(fields[2]);
        this.yearCache = new CacheableInteger(fields[3]);
        this.ltzhCache = new CacheableInteger(fields[4]);
        this.ltznCache = new CacheableInteger(fields[5]);
    }

    get time(): Time { return this.timeCache.value; }
    get day(): number { return this.dayCache.value; }
    get month(): number { return this.monthCache.value; }
    get year(): number { return this.yearCache.value; }
    get ltzh(): number { return this.ltzhCache.value; }
    get ltzn(): number { return this.ltznCache.value; }
}
