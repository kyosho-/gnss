import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { Time } from './time';

export class MessageGrs extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GRS;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 16;
    static readonly RESIDUAL_NUM = 12;

    private fields: string[];

    private timeCache: Time;
    private modeCache: number; // int
    private residualCache: number[]; // float[]
    private systemIdCache: number; // int
    private signalIdCache: number; // int

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGrs.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = Time.parse(this.fields[0]);
        }
        return this.timeCache;
    }
    get mode(): number {
        if (undefined === this.modeCache) {
            this.modeCache = Number.parseInt(this.fields[1], 10);
        }
        return this.modeCache;
    }
    get residual(): number[] {
        if (undefined === this.residualCache) {
            this.residualCache = [];
            for (const element of this.fields.slice(2, 14)) {
                const num = Number.parseFloat(element);
                this.residualCache.push(num);
            }
        }
        return this.residualCache;
    }
    get systemId(): number {
        if (undefined === this.systemIdCache) {
            this.systemIdCache = Number.parseInt(this.fields[14], 10);
        }
        return this.systemIdCache;
    }
    get signalId(): number {
        if (undefined === this.signalIdCache) {
            this.signalIdCache = Number.parseInt(this.fields[15], 10);
        }
        return this.signalIdCache;
    }
}
