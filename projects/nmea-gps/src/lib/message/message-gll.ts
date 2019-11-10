import { NmeaGps } from '../nmea-gps';
import { Message } from './message';
import { MessageId, Dm, Ns, Ew, Time } from '../type';
import { mapToEnum } from '../util/map-to-enum';

export class MessageGll extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GLL;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 7;

    private latCache: Dm;
    private nsCache: Ns;
    private lonCache: Dm;
    private ewCache: Ew;
    private timeCache: Time;
    // private statusCache: string;
    // private posModeCache: string;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageGll.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get lat(): Dm {
        if (undefined === this.latCache) {
            this.latCache = Dm.parse(this.fields[1], this.fields[0]);
        }
        return this.latCache;
    }

    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = mapToEnum(Ns, this.fields[1]);
        }
        return this.nsCache;
    }

    get lon(): Dm {
        if (undefined === this.lonCache) {
            this.lonCache = Dm.parse(this.fields[3], this.fields[2]);
        }
        return this.lonCache;
    }

    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = mapToEnum(Ew, this.fields[3]);
        }
        return this.ewCache;
    }

    get time(): Time {
        if (undefined === this.timeCache) {
            this.timeCache = Time.parse(this.fields[4]);
        }
        return this.timeCache;
    }

    get status(): string {
        return this.fields[5];
    }

    get posMode(): string {
        return this.fields[6];
    }
}
