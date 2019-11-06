import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { Satellite } from './satellite';

export class MessageGsv extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GSV;

    private fields: string[];
    private hasSignalId: boolean;
    private svNum: number;

    private numMsgCache: number; // int
    private msgNumCache: number; // int
    private numSvCache: number; // int
    private svCache: Satellite[];
    /**
     * NMEA defined GNSS Signal ID, see SignalIdentifiers table (only available in NMEA 4.10and later)
     * option?
     */
    private signalIdCache: number; // int

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
            this.numMsgCache = Number.parseInt(this.fields[0], 10);
        }
        return this.numMsgCache;
    }
    get msgNum(): number {
        if (undefined === this.msgNumCache) {
            this.msgNumCache = Number.parseInt(this.fields[1], 10);
        }
        return this.msgNumCache;
    }
    get numSv(): number {
        if (undefined === this.numSvCache) {
            this.numSvCache = Number.parseInt(this.fields[2], 10);
        }
        return this.numSvCache;
    }
    get sv(): Satellite[] {
        if (undefined === this.svCache) {
            this.svCache = [];
            for (let i = 0, offset = 3; i < this.svNum; i++ , offset += 4) {
                const svid = Number.parseInt(this.fields[offset + 0], 10);
                const elv = Number.parseInt(this.fields[offset + 1], 10);
                const az = Number.parseInt(this.fields[offset + 2], 10);
                const cno = Number.parseInt(this.fields[offset + 3], 10);
                this.svCache.push(new Satellite(svid, elv, az, cno));
            }
        }
        return this.svCache;
    }
    get signalId(): number {
        if (undefined === this.signalIdCache && this.hasSignalId) {
            this.signalIdCache = Number.parseInt(this.fields[this.fields.length - 1], 10);
        }
        return undefined === this.signalIdCache ?
            undefined : this.signalIdCache;
    }
}
