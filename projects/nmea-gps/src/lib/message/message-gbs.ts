import { Message } from './message';
import { MessageId, Time } from '../type';
import { NmeaGps } from '../nmea-gps';

export class MessageGbs extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GBS;

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 10;

    private timeCache: Time;
    private errLatCache: number; // float
    private errLonCache: number; // float
    private errAltCache: number; // float
    private svidCache: number; // int
    private probCache: number; // int
    private biasCache: number; // float
    private stddevCache: number; // float
    private systemIdCache: number; // int
    private signalIdCache: number; // int

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageGbs.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = Time.parse(this.fields[0]);
        }
        return this.timeCache;
    }

    get errLat(): number {
        if (undefined === this.errLatCache) {
            this.errLatCache = Number.parseFloat(this.fields[1]);
        }
        return this.errLatCache;
    }

    get errLon(): number {
        if (undefined === this.errLonCache) {
            this.errLonCache = Number.parseFloat(this.fields[2]);
        }
        return this.errLonCache;
    }

    get errAlt(): number {
        if (undefined === this.errAltCache) {
            this.errAltCache = Number.parseFloat(this.fields[3]);
        }
        return this.errAltCache;
    }

    get svid(): number {
        if (undefined === this.svidCache) {
            this.svidCache = Number.parseInt(this.fields[4], 10);
        }
        return this.svidCache;
    }

    get prob(): number {
        if (undefined === this.probCache) {
            this.probCache = Number.parseInt(this.fields[5], 10);
        }
        return this.probCache;
    }

    get bias(): number {
        if (undefined === this.biasCache) {
            this.biasCache = Number.parseFloat(this.fields[6]);
        }
        return this.biasCache;
    }

    get stddev(): number {
        if (undefined === this.stddevCache) {
            this.stddevCache = Number.parseFloat(this.fields[7]);
        }
        return this.stddevCache;
    }

    get systemId(): number {
        if (undefined === this.systemIdCache) {
            this.systemIdCache = Number.parseInt(this.fields[8], 10);
        }
        return this.systemIdCache;
    }

    get signalId(): number {
        if (undefined === this.signalIdCache) {
            this.signalIdCache = Number.parseInt(this.fields[9], 10);
        }
        return this.signalIdCache;
    }
}
