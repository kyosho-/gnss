import { NmeaStd } from './nmea-std';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageVtg } from '../model/message-vtg';

export class NmeaStdVtg extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 9;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.VTG;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (splitted.length !== NmeaStdVtg.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            cogt: Number.parseFloat(splitted[0]),
        } as MessageVtg;
    }
}
