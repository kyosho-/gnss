import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { CacheableFloat } from '../util/cacheable-float';

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

    private twdCache: CacheableFloat;
    private twdUnitCache: string;
    private wdCache: CacheableFloat;
    private wdUnitCache: string;
    private tgdCache: CacheableFloat;
    private tgdUnitCache: string;
    private gdCache: CacheableFloat;
    private gdUnitCache: string;

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
            this.twdCache = new CacheableFloat(this.fields[0]);
        }
        return this.twdCache.value;
    }
    get tweUnit(): string {
        if (undefined === this.twdUnitCache) {
            this.twdUnitCache = this.fields[1];
        }
        return this.twdUnitCache;
    }
    get wd(): number {
        if (undefined === this.wdCache) {
            this.wdCache = new CacheableFloat(this.fields[2]);
        }
        return this.wdCache.value;
    }
    get wdUnit(): string {
        if (undefined === this.wdUnitCache) {
            this.wdUnitCache = this.fields[3];
        }
        return this.wdUnitCache;
    }
    get tgd(): number {
        if (undefined === this.tgdCache) {
            this.tgdCache = new CacheableFloat(this.fields[4]);
        }
        return this.tgdCache.value;
    }
    get tgdUnit(): string {
        if (undefined === this.tgdUnitCache) {
            this.tgdUnitCache = this.fields[5];
        }
        return this.tgdUnitCache;
    }
    get gd(): number {
        if (undefined === this.gdCache) {
            this.gdCache = new CacheableFloat(this.fields[6]);
        }
        return this.gdCache.value;
    }
    get gdUnit(): string {
        if (undefined === this.gdUnitCache) {
            this.gdUnitCache = this.fields[7];
        }
        return this.gdUnitCache;
    }
}
