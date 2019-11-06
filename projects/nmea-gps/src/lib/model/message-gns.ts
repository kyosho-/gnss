import { Message } from './message';
import { MessageId } from './message-id.enum';
import { Time } from './time';
import { Dm } from './dm';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';
import { mapToEnum } from '../util/map-to-enum';
import { NmeaGps } from '../nmea-gps';

export class MessageGns extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GNS;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 13;

    private timeCache: Time;
    private latCache: Dm;
    private nsCache: Ns;
    private lonCache: Dm;
    private ewCache: Ew;
    // private posModeCache: string;
    private numSvCache: number; // int
    private hdopCache: number; // float
    private altCache: number; // float
    private sepCache: number; // float
    private diffAgeCache: number; // int
    private diffStationCache: number; // int
    // private navStatusCache: string;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageGns.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = Time.parse(this.fields[0]);
        }
        return this.timeCache;
    }
    get lat(): Dm {
        if (undefined === this.latCache) {
            this.latCache = Dm.parse(this.fields[2], this.fields[1]);
        }
        return this.latCache;
    }
    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = mapToEnum(Ns, this.fields[2]);
        }
        return this.nsCache;
    }
    get lon(): Dm {
        if (undefined === this.lonCache) {
            this.lonCache = Dm.parse(this.fields[4], this.fields[3]);
        }
        return this.lonCache;
    }
    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = mapToEnum(Ew, this.fields[4]);
        }
        return this.ewCache;
    }
    get posMode(): string {
        return this.fields[5];
    }
    get numSv(): number {
        if (undefined === this.numSvCache) {
            this.numSvCache = Number.parseInt(this.fields[6], 10);
        }
        return this.numSvCache;
    }
    get hdop(): number {
        if (undefined === this.hdopCache) {
            this.hdopCache = Number.parseFloat(this.fields[7]);
        }
        return this.hdopCache;
    }
    get alt(): number {
        if (undefined === this.altCache) {
            this.altCache = Number.parseFloat(this.fields[8]);
        }
        return this.altCache;
    }
    get sep(): number {
        if (undefined === this.sepCache) {
            this.sepCache = Number.parseFloat(this.fields[9]);
        }
        return this.sepCache;
    }
    get diffAge(): number {
        if (undefined === this.diffAgeCache) {
            this.diffAgeCache = Number.parseInt(this.fields[10], 10);
        }
        return this.diffAgeCache;
    }
    get diffStation(): number {
        if (undefined === this.diffStationCache) {
            this.diffStationCache = Number.parseInt(this.fields[11], 10);
        }
        return this.diffStationCache;
    }
    get navStatus(): string {
        return this.fields[12];
    }
}
