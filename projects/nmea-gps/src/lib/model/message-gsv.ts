import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { Satellite } from './satellite';
import { CacheableInteger } from '../util/cacheable-integer';
import { CacheableSatelliteArray } from '../util/cacheable-satellite-array';

export class MessageGsv extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GSV;

    private numMsgCache: CacheableInteger;
    private msgNumCache: CacheableInteger;
    private numSvCache: CacheableInteger;
    private svCache: CacheableSatelliteArray;
    /**
     * NMEA defined GNSS Signal ID, see SignalIdentifiers table (only available in NMEA 4.10and later)
     * option?
     */
    private signalIdCache: CacheableInteger;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        const size = fields.length;
        const remaining = (size - 3) % 4;
        const hasSignalId = remaining === 1;
        const svNum = Math.floor((size - 3) / 4);

        if (!(remaining === 0 || remaining === 1) || svNum < 0 || svNum > 4) {
            throw new Error(
                `Parse Error. (talkerId=${talkerId}, messageId=${messageId}, fields=${JSON.stringify(fields)})`);
        }

        // TODO: コンストラクタではstring[]のみを保持しておきたい。
        // 各アクセサが呼ばれたときにキャッシュを構成することで、遅延実行を実現する。
        this.numMsgCache = new CacheableInteger(fields[0]);
        this.msgNumCache = new CacheableInteger(fields[1]);
        this.numSvCache = new CacheableInteger(fields[2]);

        const rawArray: string[][] = [];
        for (let i = 0, offset = 3; i < svNum; i++ , offset += 4) {
            const raw = [];
            raw.push(fields[offset + 0]);
            raw.push(fields[offset + 1]);
            raw.push(fields[offset + 2]);
            raw.push(fields[offset + 3]);
            rawArray.push(raw);
        }
        this.svCache = new CacheableSatelliteArray(rawArray);

        if (hasSignalId) {
            this.signalIdCache = new CacheableInteger(fields[fields.length - 1]);
        }
    }

    get numMsg(): number { return this.numMsgCache.value; }
    get msgNum(): number { return this.msgNumCache.value; }
    get numSv(): number { return this.numSvCache.value; }
    get sv(): Satellite[] { return this.svCache.value; }
    get signalId(): number {
        return undefined === this.signalIdCache ?
            undefined : this.signalIdCache.value;
    }
}
