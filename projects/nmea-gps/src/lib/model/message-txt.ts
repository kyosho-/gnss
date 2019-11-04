import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableInteger } from '../util/cacheable-integer';

export class MessageTxt extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.TXT;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 4;

    private numMsgCache: CacheableInteger;
    private msgNumCache: CacheableInteger;
    private msgTypeCache: CacheableInteger;
    private textCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageTxt.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.numMsgCache = new CacheableInteger(fields[0]);
        this.msgNumCache = new CacheableInteger(fields[1]);
        this.msgTypeCache = new CacheableInteger(fields[2]);
        this.textCache = fields[3];
    }

    get numMsg(): number { return this.numMsgCache.value; }
    get msgNum(): number { return this.msgNumCache.value; }
    get msgType(): number { return this.msgTypeCache.value; }
    get text(): string { return this.textCache; }
}
