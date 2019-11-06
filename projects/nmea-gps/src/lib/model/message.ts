import { TalkerId } from './talker-id.enum';
import { MessageId } from './message-id.enum';
import { NmeaGps } from '../nmea-gps';

/**
 * ![UML](media://class-message.png)
 */
export class Message {
    private nmea: NmeaGps;
    protected fields: string[];

    constructor(nmea: NmeaGps) {
        this.nmea = nmea;
        this.fields = nmea.splitted;
    }

    get talkerId(): TalkerId { return this.nmea.talkerId; }

    get messageId(): MessageId { return this.nmea.messageId; }

    get value(): string { return this.nmea.getValue(); }
}
