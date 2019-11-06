import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export class MessageVlw extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.VLW;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private fields: string[];

    private twdCache: number; // float
    // private twdUnitCache: string;
    private wdCache: number; // float
    // private wdUnitCache: string;
    private tgdCache: number; // float
    // private tgdUnitCache: string;
    private gdCache: number; // float
    // private gdUnitCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageVlw.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }
        // save
        this.fields = fields;
    }

    get twd(): number {
        if (undefined === this.twdCache) {
            this.twdCache = Number.parseFloat(this.fields[0]);
        }
        return this.twdCache;
    }
    get twdUnit(): string {
        return this.fields[1];
    }
    get wd(): number {
        if (undefined === this.wdCache) {
            this.wdCache = Number.parseFloat(this.fields[2]);
        }
        return this.wdCache;
    }
    get wdUnit(): string {
        return this.fields[3];
    }
    get tgd(): number {
        if (undefined === this.tgdCache) {
            this.tgdCache = Number.parseFloat(this.fields[4]);
        }
        return this.tgdCache;
    }
    get tgdUnit(): string {
        return this.fields[5];
    }
    get gd(): number {
        if (undefined === this.gdCache) {
            this.gdCache = Number.parseFloat(this.fields[6]);
        }
        return this.gdCache;
    }
    get gdUnit(): string {
        return this.fields[7];
    }
}
