import { NmeaStd } from './nmea-std';
import { Message } from '../model/message';
import { TalkerId } from '../model/talker-id.enum';
import { MessageId } from '../model/message-id.enum';
import { MessageGbq } from '../model/message-gbq';

/**
 * NMEA DTM Sentence
 */
export class NmeaStdGbq extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 1;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GBQ;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (splitted.length !== NmeaStdGbq.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            msgId: splitted[0]
        } as MessageGbq;
    }
}
