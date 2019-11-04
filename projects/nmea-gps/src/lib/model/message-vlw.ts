import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableFloat } from '../util/cacheable-float';

export class MessageVlw extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.VLW;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private twdCache: CacheableFloat;
    private twdUnitCache: string;
    private wdCache: CacheableFloat;
    private wdUnitCache: string;
    private tgdCache: CacheableFloat;
    private tgdUnitCache: string;
    private gdCache: CacheableFloat;
    private gdUnitCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageVlw.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.twdCache = new CacheableFloat(fields[0]);
    }

    get twd(): number { return this.twdCache.value; }
    get tweUnit(): string { return this.twdUnitCache; }
    get wd(): number { return this.wdCache.value; }
    get wdUnit(): string { return this.wdUnitCache; }
    get tgd(): number { return this.tgdCache.value; }
    get tgdUnit(): string { return this.tgdUnitCache; }
    get gd(): number { return this.gdCache.value; }
    get gdUnit(): string { return this.gdUnitCache; }
}
