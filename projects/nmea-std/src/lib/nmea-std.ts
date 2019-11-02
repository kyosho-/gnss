import { TalkerId } from './model/talker-id.enum';
import { MessageId } from './model/message-id.enum';
import { Message } from './model/message';
import { MessageSummary } from './model/message-summary';
import { Nmea, mapToEnum } from '@kyosho-/nmea';

/**
 * NMEA Base Sentence
 */
export abstract class NmeaStd extends Nmea {
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

    static isStandard(nmea: Nmea): MessageSummary {
        const address = nmea.getAddress();
        if (address.length !== NmeaStd.ADDRESS_LENGTH) {
            return { isStandard: false };
        }

        let substr = address.substr(
            0,
            NmeaStd.TALKER_ID_LENGTH);
        const tid = mapToEnum(TalkerId, substr);

        substr = address.substr(
            NmeaStd.TALKER_ID_LENGTH,
            NmeaStd.MESSAGE_ID_LENGTH);
        const mid = mapToEnum(MessageId, substr);

        return {
            isStandard: tid !== undefined && mid !== undefined,
            talkerId: tid,
            messageId: mid
        };
    }

    /**
     * Constructor.
     * @param input NMEA Line string or data.
     */
    constructor(input: Nmea) {
        super();

        // validate
        const result = NmeaStd.isStandard(input);
        this.validate(input, result);

        // assign
        this.address = input.getAddress();
        this.value = input.getValue();
        this.talkerId = result.talkerId;
        this.messageId = result.messageId;

        // parse
        this.message = this.parse(this.talkerId, this.messageId, this.value);
    }

    abstract validateMessageId(mid: MessageId): boolean;

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param value value
     */
    abstract parse(tid: TalkerId, mid: MessageId, value: string): Message;

    validate(input: Nmea, result: MessageSummary) {
        if (!result.isStandard) {
            throw new Error(`Input data is not standard NMEA format.(input=${input})`);
        }

        if (!result.talkerId) {
            throw new Error(`Data is not match talker ID.(messageId=${result.talkerId})`);
        }

        if (!this.validateMessageId(result.messageId)) {
            throw new Error(`Data is not match message ID.(messageId=${result.messageId})`);
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
