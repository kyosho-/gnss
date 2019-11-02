import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageTxt } from '../model/message-txt';

export class NmeaGpsTxt extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 4;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.TXT;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (splitted.length !== NmeaGpsTxt.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            numMsg: Number.parseInt(splitted[0], 10),
            msgNum: Number.parseInt(splitted[1], 10),
            msgType: Number.parseInt(splitted[2], 10),
            text: splitted[3]
        } as MessageTxt;
    }
}
