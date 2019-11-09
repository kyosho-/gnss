import { Message } from './message';
import { MessageId } from '../primitive-type/message-id.enum';
import { NmeaGps } from '../nmea-gps';

export class MessageGlq extends Message {
    /**
     * Message ID.
     */
    static readonly ID = MessageId.GLQ;

    /**
     * Field parameter number.
     */
    static readonly FIELD_NUM = 1;

    constructor(nmea: NmeaGps) {
        super(nmea);

        // validation
        if (undefined === this.fields ||
            this.fields.length !== MessageGlq.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${this.value})`);
        }
    }

    get msgId(): string { return this.fields[0]; }
}
