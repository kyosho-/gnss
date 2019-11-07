import { Message } from './message';
import { MessageId } from './message-id.enum';
import { NmeaGps } from '../nmea-gps';

export class MessageTxt extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.TXT;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 4;

    private numMsgCache: number; // int
    private msgNumCache: number; // int
    private msgTypeCache: number; // int
    // private textCache: string;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageTxt.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
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
    get msgType(): number {
        if (undefined === this.msgTypeCache) {
            this.msgTypeCache = Number.parseInt(this.fields[2], 10);
        }
        return this.msgTypeCache;
    }
    get text(): string {
        return this.fields[3];
    }
}
