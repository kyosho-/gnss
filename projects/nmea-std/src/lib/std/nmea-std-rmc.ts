import { NmeaStd } from './nmea-std';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageRmc } from '../model/message-rmc';

export class NmeaStdRmc extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 12;
    public static readonly FIELD_NUM_410 = 13;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.RMC;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (!(splitted.length === NmeaStdRmc.FIELD_NUM ||
            splitted.length === NmeaStdRmc.FIELD_NUM_410)) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            time: splitted[0],
            status: splitted[1],
            lat: splitted[2],
            NS: splitted[3],
            lon: splitted[4],
            EW: splitted[5],
            spd: Number.parseFloat(splitted[6]),
            cog: Number.parseFloat(splitted[7]),
            date: splitted[8],
            mv: Number.parseFloat(splitted[9]),
            mvEW: splitted[10],
            posMode: splitted[11],
            navStatus: splitted.length === NmeaStdRmc.FIELD_NUM_410 ? splitted[12] : undefined
        } as MessageRmc;
    }
}
