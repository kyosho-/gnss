import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export class MessageVtg extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.VTG;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 9;

    private fields: string[];

    private cogtCache: number; // float
    // private cogtUnitCache: string;
    private cogmCache: number; // float
    // private cogmUnitCache: string;
    private sognCache: number; // float
    // private sognUnitCache: string;
    private sogkCache: number; // float
    // private sogkUnitCache: string;
    // private posModeCache: string;

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageVtg.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get cogt(): number {
        if (undefined === this.cogtCache) {
            this.cogtCache = Number.parseFloat(this.fields[0]);
        }
        return this.cogtCache;
    }
    get cogtUnit(): string {
        return this.fields[1];
    }
    get cogm(): number {
        if (undefined === this.cogmCache) {
            this.cogmCache = Number.parseFloat(this.fields[2]);
        }
        return this.cogmCache;
    }
    get cogmUnit(): string {
        return this.fields[3];
    }
    get sogn(): number {
        if (undefined === this.sognCache) {
            this.sognCache = Number.parseFloat(this.fields[4]);
        }
        return this.sognCache;
    }
    get sognUnit(): string {
        return this.fields[5];
    }
    get sogk(): number {
        if (undefined === this.sogkCache) {
            this.sogkCache = Number.parseFloat(this.fields[6]);
        }
        return this.sogkCache;
    }
    get sogkUnit(): string {
        return this.fields[7];
    }
    get posMode(): string {
        return this.fields[8];
    }
}
