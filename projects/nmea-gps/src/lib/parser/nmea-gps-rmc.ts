import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageRmc } from '../model/message-rmc';

export class NmeaGpsRmc extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_NUM = 12;
    public static readonly FIELD_NUM_410 = 13;

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        // カンマ区切りを分割するだけならば、パーサを一つにまとめられると思う。
        // TODO: 1つにまとめる方向で検討する。
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (!(splitted.length === NmeaGpsRmc.FIELD_NUM ||
            splitted.length === NmeaGpsRmc.FIELD_NUM_410)) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return new MessageRmc(tid, mid, splitted);
    }
}
