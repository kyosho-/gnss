import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGll } from '../model/message-gll';

export class NmeaGpsGll extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 7;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GLL;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (splitted.length !== NmeaGpsGll.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            lat: splitted[0],
            NS: splitted[1],
            lon: splitted[2],
            EW: splitted[3],
            time: splitted[4],
            status: splitted[5],
            posMode: splitted[6]
        } as MessageGll;
    }
}
