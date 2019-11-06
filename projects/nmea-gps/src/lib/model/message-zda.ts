import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
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

    private fields: string[];

    private timeCache: Time;
    private dayCache: number; // int
    private monthCache: number; // int
    private yearCache: number; // int
    private ltzhCache: number; // int
    private ltznCache: number; // int

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageZda.FIELD_NUM) {
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
    get day(): number {
        if (undefined === this.dayCache) {
            this.dayCache = Number.parseInt(this.fields[1], 10);
        }
        return this.dayCache;
    }
    get month(): number {
        if (undefined === this.monthCache) {
            this.monthCache = Number.parseInt(this.fields[2], 10);
        }
        return this.monthCache;
    }
    get year(): number {
        if (undefined === this.yearCache) {
            this.yearCache = Number.parseInt(this.fields[3], 10);
        }
        return this.yearCache;
    }
    get ltzh(): number {
        if (undefined === this.ltzhCache) {
            this.ltzhCache = Number.parseInt(this.fields[4], 10);
        }
        return this.ltzhCache;
    }
    get ltzn(): number {
        if (undefined === this.ltznCache) {
            this.ltznCache = Number.parseInt(this.fields[5], 10);
        }
        return this.ltznCache;
    }
}
