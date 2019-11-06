import { Message } from './message';
import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { Time } from './time';
import { Dm } from './dm';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';
import { Ymd } from './ymd';
import { mapToEnum } from '../util/map-to-enum';
import { NmeaGps } from '../nmea-gps';

export class MessageRmc extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.RMC;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 12;
    static readonly FIELD_NUM_410 = 13;

    private timeCache: Time;
    // private statusCache: string;
    private latCache: Dm;
    private nsCache: Ns;
    private lonCache: Dm;
    private ewCache: Ew;
    private spdCache: number; // float
    private cogCache: number; // float
    private dateCache: Ymd;
    private mvCache: number; // float
    // private mvEwCache: string;
    // private posModeCache: string;
    // private navStatusCache: string;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            (this.fields.length !== MessageRmc.FIELD_NUM &&
                this.fields.length !== MessageRmc.FIELD_NUM_410)) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = Time.parse(this.fields[0]);
        }
        return this.timeCache;
    }
    get status(): string {
        return this.fields[1];
    }
    get lat(): Dm {
        if (undefined === this.latCache) {
            this.latCache = Dm.parse(this.fields[3], this.fields[2]);
        }
        return this.latCache;
    }
    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = mapToEnum(Ns, this.fields[3]);
        }
        return this.nsCache;
    }
    get lon(): Dm {
        if (undefined === this.lonCache) {
            this.lonCache = Dm.parse(this.fields[5], this.fields[4]);
        }
        return this.lonCache;
    }
    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = mapToEnum(Ew, this.fields[5]);
        }
        return this.ewCache;
    }
    get spd(): number {
        if (undefined === this.spdCache) {
            this.spdCache = Number.parseFloat(this.fields[6]);
        }
        return this.spdCache;
    }
    get cog(): number {
        if (undefined === this.cogCache) {
            this.cogCache = Number.parseFloat(this.fields[7]);
        }
        return this.cogCache;
    }
    get date(): Ymd {
        if (undefined === this.dateCache) {
            this.dateCache = Ymd.parse(this.fields[8]);
        }
        return this.dateCache;
    }
    get mv(): number {
        if (undefined === this.mvCache) {
            this.mvCache = Number.parseFloat(this.fields[9]);
        }
        return this.mvCache;
    }
    get mvEw(): string {
        return this.fields[10];
    }
    get posMode(): string {
        return this.fields[11];
    }
    get navStatus(): string {
        return this.fields.length === MessageRmc.FIELD_NUM_410 ?
            this.fields[12] : undefined;
    }
}
