import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export class MessageGlq extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GLQ;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 1;

    private msgIdCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        if (fields.length !== MessageGlq.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.msgIdCache = fields[0];
    }

    get msgId(): string { return this.msgIdCache; }
}
