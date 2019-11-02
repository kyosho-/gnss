import { NmeaStd } from './nmea-std';
import { Message } from '../model/message';
import { TalkerId } from '../model/talker-id.enum';
import { MessageId } from '../model/message-id.enum';
import { MessageGbs } from '../model/message-gbs';

/**
 * NMEA GBS Sentence
 */
export class NmeaStdGbs extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 10;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GBS;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (splitted.length !== NmeaStdGbs.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            time: splitted[0],
            errLat: Number.parseFloat(splitted[1]),
            errLon: Number.parseFloat(splitted[2]),
            errAlt: Number.parseFloat(splitted[3]),
            svid: Number.parseInt(splitted[4], 10),
            prob: Number.parseInt(splitted[5], 10),
            bias: Number.parseFloat(splitted[6]),
            stddev: Number.parseFloat(splitted[7]),
            systemId: Number.parseInt(splitted[8], 10),
            signalId: Number.parseInt(splitted[9], 10)
        } as MessageGbs;
    }
}
