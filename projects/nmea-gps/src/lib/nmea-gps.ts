import { Nmea } from '@kyosho-/nmea';

import { mapToEnum } from './util/map-to-enum';
import { TalkerId } from './model/talker-id.enum';
import { MessageId } from './model/message-id.enum';

/**
 * NMEA Base Sentence
 */
export class NmeaGps extends Nmea {

    /**
     * 
     */
    static readonly ADDRESS_REGEX: RegExp =
        /^([A-Z]{2})([A-Z]{3})$/;

    /**
     * 
     */
    static readonly ADDRESS_LENGTH = 5;

    /**
     * Field delimiter
     */
    static readonly FIELD_DELIMITER: string = ',';

    /**
     * 
     */
    protected talkerIdInternal: TalkerId;

    /**
     * 
     */
    protected messageIdInternal: MessageId;

    /**
     * Constructor.
     * @param line NMEA Line string or data.
     */
    constructor(line: string) {
        super(line);
        this.initialize();
    }

    /**
     * 
     */
    private initialize(): void {
        if (undefined === this.address ||
            this.address.length !== NmeaGps.ADDRESS_LENGTH) {
            throw new Error(`Address is invalid. (address=${this.address})`);
        }

        const matched: string[] = this.address.match(NmeaGps.ADDRESS_REGEX);
        if (null === matched || undefined === matched || 3 !== matched.length) {
            throw new Error(`Parse error. (address=${this.address})`);
        }

        this.talkerIdInternal = mapToEnum(TalkerId, matched[1]);
        this.messageIdInternal = mapToEnum(MessageId, matched[2]);
    }

    /**
     * 
     */
    get talkerId(): TalkerId {
        return this.talkerIdInternal;
    }

    /**
     * 
     */
    get messageId(): MessageId {
        return this.messageIdInternal;
    }

    /**
     * 
     */
    get splitted(): string[] {
        return this.getValue().split(NmeaGps.FIELD_DELIMITER);
    }
}
