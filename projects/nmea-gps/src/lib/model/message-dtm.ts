import { Message } from './message';
import { Datum } from './datum.enum';
import { MessageId } from './message-id.enum';
import { Ns } from './ns.enum';
import { Ew } from './ew.enum';
import { mapToEnum } from '../util/map-to-enum';
import { NmeaGps } from '../nmea-gps';

export class MessageDtm extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.DTM;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 8;

    private datumCache: Datum;
    // private subDatumCache: string;
    private latCache: number; // float
    private nsCache: Ns;
    private lonCache: number; // float
    private ewCache: Ew;
    private altCache: number; // float
    private refDatumCache: Datum;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageDtm.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get datum(): Datum {
        if (undefined === this.datumCache) {
            this.datumCache = mapToEnum(Datum, this.fields[0]);
        }
        return this.datumCache;
    }

    get subDatum(): string {
        return this.fields[1];
    }

    get lat(): number {
        if (undefined === this.latCache) {
            this.latCache = Number.parseFloat(this.fields[2]);
        }
        return this.latCache;
    }

    get ns(): Ns {
        if (undefined === this.nsCache) {
            this.nsCache = mapToEnum(Ns, this.fields[3]);
        }
        return this.nsCache;
    }

    get lon(): number {
        if (undefined === this.lonCache) {
            this.lonCache = Number.parseFloat(this.fields[4]);
        }
        return this.lonCache;
    }

    get ew(): Ew {
        if (undefined === this.ewCache) {
            this.ewCache = mapToEnum(Ew, this.fields[5]);
        }
        return this.ewCache;
    }

    get alt(): number {
        if (undefined === this.altCache) {
            this.altCache = Number.parseFloat(this.fields[6]);
        }
        return this.altCache;
    }

    get refDatum(): Datum {
        if (undefined === this.refDatumCache) {
            this.refDatumCache = mapToEnum(Datum, this.fields[7]);
        }
        return this.refDatumCache;
    }
}
