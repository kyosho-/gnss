import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';

export class MessageGsa extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GSA;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 18;

    private fields: string[];

    // private opModeCache: string;
    private navModeCache: number; // int
    private svidCache: number[]; // int
    private pdopCache: number; // float
    private hdopCache: number; // float
    private vdopCache: number; // float
    private systemIdCache: number; // int

    constructor(
        talkerId: TalkerId,
        messageId: MessageId,
        fields: string[]) {
        super(talkerId, messageId);

        // validation
        if (undefined === fields || fields.length !== MessageGsa.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${fields})`);
        }

        // save
        this.fields = fields;
    }

    get opMode(): string {
        return this.fields[0];
    }
    get navMode(): number {
        if (undefined === this.navModeCache) {
            this.navModeCache = Number.parseInt(this.fields[1], 10);
        }
        return this.navModeCache;
    }
    get svid(): number[] {
        if (undefined === this.svidCache) {
            this.svidCache = [];
            for (const element of this.fields.slice(2, 14)) {
                const num = Number.parseInt(element, 10);
                this.svidCache.push(num);
            }
        }
        return this.svidCache;
    }
    get pdop(): number {
        if (undefined === this.pdopCache) {
            this.pdopCache = Number.parseFloat(this.fields[14]);
        }
        return this.pdopCache;
    }
    get hdop(): number {
        if (undefined === this.hdopCache) {
            this.hdopCache = Number.parseFloat(this.fields[15]);
        }
        return this.hdopCache;
    }
    get vdop(): number {
        if (undefined === this.vdopCache) {
            this.vdopCache = Number.parseFloat(this.fields[16]);
        }
        return this.vdopCache;
    }
    get systemId(): number {
        if (undefined === this.systemIdCache) {
            this.systemIdCache = Number.parseInt(this.fields[17], 10);
        }
        return this.systemIdCache;
    }
}
