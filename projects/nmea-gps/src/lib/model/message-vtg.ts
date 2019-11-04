import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableFloat } from '../util/cacheable-float';

export class MessageVtg extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.VTG;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 9;

    private cogtCache: CacheableFloat;
    private cogtUnitCache: string;
    private cogmCache: CacheableFloat;
    private cogmUnitCache: string;
    private sognCache: CacheableFloat;
    private sognUnitCache: string;
    private sogkCache: CacheableFloat;
    private sogkUnitCache: string;
    private posModeCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageVtg.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.cogtCache = new CacheableFloat(fields[0]);
        this.cogtUnitCache = fields[1];
        this.cogmCache = new CacheableFloat(fields[2]);
        this.cogmUnitCache = fields[3];
        this.sognCache = new CacheableFloat(fields[4]);
        this.sognUnitCache = fields[5];
        this.sogkCache = new CacheableFloat(fields[6]);
        this.sogkUnitCache = fields[7];
        this.posModeCache = fields[8];
    }

    get cogt(): number { return this.cogtCache.value; }
    get cogtUnit(): string { return this.cogtUnitCache; }
    get cogm(): number { return this.cogmCache.value; }
    get cogmUnit(): string { return this.cogmUnitCache; }
    get sogn(): number { return this.sognCache.value; }
    get sognUnit(): string { return this.sognUnitCache; }
    get sogk(): number { return this.sogkCache.value; }
    get sogkUnit(): string { return this.sogkUnitCache; }
}
