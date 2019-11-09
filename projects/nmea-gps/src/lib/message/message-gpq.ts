import { Message } from './message';
import { MessageId } from '../primitive-type';
import { NmeaGps } from '../nmea-gps';

export class MessageGpq extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GPQ;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 1;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageGpq.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get msgId(): string { return this.fields[0]; }
}
