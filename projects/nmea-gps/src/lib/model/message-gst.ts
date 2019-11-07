import { Message } from './message';
import { MessageId } from './message-id.enum';
import { Time } from './time';
import { NmeaGps } from '../nmea-gps';

export class MessageGst extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GST;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private timeCache: Time;
    private rangeRmsCache: number; // float
    private stdMajorCache: number; // float
    private stdMinorCache: number; // float
    private orientCache: number; // float
    private stdLatCache: number; // float
    private stdLongCache: number; // float
    private stdAltCache: number; // float

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageGst.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = Time.parse(this.fields[0]);
        }
        return this.timeCache;
    }

    get rangeRms(): number {
        if (undefined === this.rangeRmsCache) {
            this.rangeRmsCache = Number.parseFloat(this.fields[1]);
        }
        return this.rangeRmsCache;
    }

    get stdMajor(): number {
        if (undefined === this.stdMajorCache) {
            this.stdMajorCache = Number.parseFloat(this.fields[2]);
        }
        return this.stdMajorCache;
    }

    get stdMinor(): number {
        if (undefined === this.stdMinorCache) {
            this.stdMinorCache = Number.parseFloat(this.fields[3]);
        }
        return this.stdMinorCache;
    }

    get orient(): number {
        if (undefined === this.orientCache) {
            this.orientCache = Number.parseFloat(this.fields[4]);
        }
        return this.orientCache;
    }

    get stdLat(): number {
        if (undefined === this.stdLatCache) {
            this.stdLatCache = Number.parseFloat(this.fields[5]);
        }
        return this.stdLatCache;
    }

    get stdLong(): number {
        if (undefined === this.stdLongCache) {
            this.stdLongCache = Number.parseFloat(this.fields[6]);
        }
        return this.stdLongCache;
    }

    get stdAlt(): number {
        if (undefined === this.stdAltCache) {
            this.stdAltCache = Number.parseFloat(this.fields[7]);
        }
        return this.stdAltCache;
    }
}
