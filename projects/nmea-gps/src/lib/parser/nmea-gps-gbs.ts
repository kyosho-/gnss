import { NmeaGps } from './nmea-gps';
import { Message } from '../model/message';
import { TalkerId } from '../model/talker-id.enum';
import { MessageId } from '../model/message-id.enum';
import { MessageGbs } from '../model/message-gbs';

/**
 * NMEA GBS Sentence
 */
export class NmeaGpsGbs extends NmeaGps {
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
        if (splitted.length !== MessageGbs.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return new MessageGbs(tid, mid, splitted);
    }
}
