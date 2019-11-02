import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGst } from '../model/message-gst';

export class NmeaGpsGst extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 8;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GST;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (splitted.length !== NmeaGpsGst.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            time: splitted[0],
            rangeRms: Number.parseFloat(splitted[1]),
            stdMajor: Number.parseFloat(splitted[2]),
            stdMinor: Number.parseFloat(splitted[3]),
            orient: Number.parseFloat(splitted[4]),
            stdLat: Number.parseFloat(splitted[5]),
            stdLong: Number.parseFloat(splitted[6]),
            stdAlt: Number.parseFloat(splitted[7])
        } as MessageGst;
    }
}
