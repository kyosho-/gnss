import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageDtm } from '../model/message-dtm';

export class NmeaGpsDtm extends NmeaGps {
    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 8;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.DTM;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (splitted.length !== NmeaGpsDtm.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            datum: splitted[0],
            subDatum: splitted[1],
            lat: Number.parseFloat(splitted[2]),
            NS: splitted[3],
            lon: Number.parseFloat(splitted[4]),
            EW: splitted[5],
            alt: Number.parseFloat(splitted[6]),
            refDatum: splitted[7]
        } as MessageDtm;
    }
}
