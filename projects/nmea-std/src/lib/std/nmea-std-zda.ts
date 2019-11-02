import { NmeaStd } from './nmea-std';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageZda } from '../model/message-zda';

export class NmeaStdZda extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 6;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.ZDA;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (splitted.length !== NmeaStdZda.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            time: splitted[0],
            day: Number.parseInt(splitted[1], 10),
            month: Number.parseInt(splitted[2], 10),
            year: Number.parseInt(splitted[3], 10),
            ltzh: Number.parseInt(splitted[4], 10),
            ltzn: Number.parseInt(splitted[5], 10)
        } as MessageZda;
    }
}
