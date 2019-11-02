import { NmeaStd } from './nmea-std';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGga } from '../model/message-gga';

export class NmeaStdGga extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 14;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GGA;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (splitted.length !== NmeaStdGga.FIELD_NUM) {
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
            quality: Number.parseInt(splitted[5], 10),
            numSV: Number.parseInt(splitted[6], 10),
            HDOP: Number.parseFloat(splitted[7]),
            alt: Number.parseFloat(splitted[8]),
            altUnit: splitted[9],
            sep: Number.parseFloat(splitted[10]),
            sepUnit: splitted[11],
            diffAge: Number.parseFloat(splitted[12]),
            diffStation: Number.parseFloat(splitted[13])
        } as MessageGga;
    }
}
