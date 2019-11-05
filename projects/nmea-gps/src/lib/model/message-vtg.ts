import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableFloat } from '../util/cacheable-float';

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

    private cogtCache: CacheableFloat;
    private cogtUnitCache: string;
    private cogmCache: CacheableFloat;
    private cogmUnitCache: string;
    private sognCache: CacheableFloat;
    private sognUnitCache: string;
    private sogkCache: CacheableFloat;
    private sogkUnitCache: string;
    private posModeCache: string;

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
            this.cogtCache = new CacheableFloat(this.fields[0]);
        }
        return this.cogtCache.value;
    }
    get cogtUnit(): string {
        if (undefined === this.cogtUnit) {
            this.cogtUnitCache = this.fields[1];
        }
        return this.cogtUnitCache;
    }
    get cogm(): number {
        if (undefined === this.cogmCache) {
            this.cogmCache = new CacheableFloat(this.fields[2]);
        }
        return this.cogmCache.value;
    }
    get cogmUnit(): string {
        if (undefined === this.cogmUnitCache) {
            this.cogmUnitCache = this.fields[3];
        }
        return this.cogmUnitCache;
    }
    get sogn(): number {
        if (undefined === this.sognCache) {
            this.sognCache = new CacheableFloat(this.fields[4]);
        }
        return this.sognCache.value;
    }
    get sognUnit(): string {
        if (undefined === this.sognUnitCache) {
            this.sognUnitCache = this.fields[5];
        }
        return this.sognUnitCache;
    }
    get sogk(): number {
        if (undefined === this.sogkCache) {
            this.sogkCache = new CacheableFloat(this.fields[6]);
        }
        return this.sogkCache.value;
    }
    get sogkUnit(): string {
        if (undefined === this.sogkUnitCache) {
            this.sogkUnitCache = this.fields[7];
        }
        return this.sogkUnitCache;
    }
    get posMode(): string {
        if (undefined === this.posModeCache) {
            this.posModeCache = this.fields[8];
        }
        return this.posModeCache;
    }
}
