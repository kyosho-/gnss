import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageZda } from '../model/message-zda';

export class NmeaGpsZda extends NmeaGps {
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
        if (splitted.length !== MessageZda.FIELD_NUM) {
            throw new Error(`Parse Error. (message=${message})`);
        }
        return new MessageZda(tid, mid, splitted);
    }
}
