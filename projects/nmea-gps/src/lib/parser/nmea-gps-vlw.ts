import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageVlw } from '../model/message-vlw';

export class NmeaGpsVlw extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 8;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.VLW;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (splitted.length !== NmeaGpsVlw.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return {
            talkerId: tid,
            messageId: mid,
            twd: Number.parseFloat(splitted[0]),
            twdUnit: splitted[1],
            wd: Number.parseFloat(splitted[2]),
            wdUnit: splitted[3],
            tgd: Number.parseFloat(splitted[4]),
            tgdUnit: splitted[5],
            gd: Number.parseFloat(splitted[6]),
            gdUnit: splitted[7]
        } as MessageVlw;
    }
}
