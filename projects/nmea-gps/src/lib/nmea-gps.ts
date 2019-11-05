import { Nmea } from '@kyosho-/nmea';

import { mapToEnum } from './util/map-to-enum';
import { TalkerId } from './model/talker-id.enum';
import { MessageId } from './model/message-id.enum';
import { Message } from './model/message';
import { MessageSummary } from './model/message-summary';

/**
 * NMEA Base Sentence
 */
export abstract class NmeaGps extends Nmea {
    public static readonly ADDRESS_LENGTH = 5;
    public static readonly TALKER_ID_LENGTH = 2;
    public static readonly MESSAGE_ID_LENGTH = 3;
    /**
     * Field delimiter
     */
    public static readonly FIELD_DELIMITER: string = ',';

    protected talkerId: TalkerId;

    protected messageId: MessageId;

    /**
     * Message
     */
    private message: Message;

    static summary(nmea: Nmea): MessageSummary {
        const address = nmea.getAddress();
        if (address.length !== NmeaGps.ADDRESS_LENGTH) {
            return { isStandard: false };
        }

        let substr = address.substr(
            0,
            NmeaGps.TALKER_ID_LENGTH);
        const tid = mapToEnum(TalkerId, substr);

        substr = address.substr(
            NmeaGps.TALKER_ID_LENGTH,
            NmeaGps.MESSAGE_ID_LENGTH);
        const mid = mapToEnum(MessageId, substr);

        return {
            isStandard: tid !== undefined && mid !== undefined,
            talkerId: tid,
            messageId: mid
        } as MessageSummary;
    }

    /**
     * Constructor.
     * @param input NMEA Line string or data.
     */
    constructor(input: Nmea) {
        super();

        // validate
        const result = NmeaGps.summary(input);
        this.validate(input, result);

        // assign
        this.address = input.getAddress();
        this.value = input.getValue();
        this.talkerId = result.talkerId;
        this.messageId = result.messageId;

        // parse
        this.message = this.parse(this.talkerId, this.messageId, this.value);
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param value value
     */
    abstract parse(tid: TalkerId, mid: MessageId, value: string): Message;
    // カンマ区切りを分割するだけならば、パーサを一つにまとめられると思う。
    // TODO: 1つにまとめる方向で検討する。

    validate(input: Nmea, result: MessageSummary) {
        if (!result.isStandard) {
            throw new Error(`Input data is not standard NMEA format.(input=${input})`);
        }

        if (!result.talkerId) {
            throw new Error(`Talker ID is undefined.(talkerId=${result.talkerId})`);
        }

        if (!result.messageId) {
            throw new Error(`Message ID is undefined.(messageId=${result.messageId})`);
        }
    }

    getTalkerId(): TalkerId {
        return this.talkerId;
    }

    getMessageId(): MessageId {
        return this.messageId;
    }

    /**
     * get Message.
     */
    getMessage(): Message {
        return this.message;
    }
}
