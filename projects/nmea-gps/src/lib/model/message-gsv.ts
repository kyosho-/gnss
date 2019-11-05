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

    private fields: string[];
    private hasSignalId: boolean;
    private svNum: number;

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

        // validation
        if (undefined === fields) {
            throw new Error(`fields is undefined.`);
        }

        const size = fields.length;
        const remaining = (size - 3) % 4;
        this.hasSignalId = remaining === 1;
        this.svNum = Math.floor((size - 3) / 4);

        if (!(remaining === 0 || remaining === 1) ||
            this.svNum < 0 || this.svNum > 4) {
            throw new Error(
                `Parse Error. (talkerId=${talkerId}, messageId=${messageId}, fields=${JSON.stringify(fields)})`);
        }

        // save
        this.fields = fields;
    }

    get numMsg(): number {
        if (undefined === this.numMsgCache) {
            this.numMsgCache = new CacheableInteger(this.fields[0]);
        }
        return this.numMsgCache.value;
    }
    get msgNum(): number {
        if (undefined === this.msgNumCache) {
            this.msgNumCache = new CacheableInteger(this.fields[1]);
        }
        return this.msgNumCache.value;
    }
    get numSv(): number {
        if (undefined === this.numSvCache) {
            this.numSvCache = new CacheableInteger(this.fields[2]);
        }
        return this.numSvCache.value;
    }
    get sv(): Satellite[] {
        if (undefined === this.svCache) {
            const rawArray: string[][] = [];
            for (let i = 0, offset = 3; i < this.svNum; i++ , offset += 4) {
                const raw = [];
                raw.push(this.fields[offset + 0]);
                raw.push(this.fields[offset + 1]);
                raw.push(this.fields[offset + 2]);
                raw.push(this.fields[offset + 3]);
                rawArray.push(raw);
            }
            this.svCache = new CacheableSatelliteArray(rawArray);
        }
        return this.svCache.value;
    }
    get signalId(): number {
        if (undefined === this.signalIdCache && this.hasSignalId) {
            this.signalIdCache = new CacheableInteger(this.fields[this.fields.length - 1]);
        }
        return undefined === this.signalIdCache ?
            undefined : this.signalIdCache.value;
    }
}
