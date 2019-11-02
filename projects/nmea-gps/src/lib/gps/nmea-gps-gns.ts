import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGns } from '../model/message-gns';

export class NmeaGpsGns extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 13;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GNS;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (splitted.length !== NmeaGpsGns.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            time: splitted[0],
            lat: splitted[1],
            NS: splitted[2],
            lon: splitted[3],
            EW: splitted[4],
            posMode: splitted[5],
            numSV: Number.parseInt(splitted[6], 10),
            HDOP: Number.parseFloat(splitted[7]),
            alt: Number.parseFloat(splitted[8]),
            sep: Number.parseFloat(splitted[9]),
            diffAge: Number.parseInt(splitted[10], 10),
            diffStation: Number.parseInt(splitted[11], 10),
            navStatus: splitted[12]
        } as MessageGns;
    }
}
