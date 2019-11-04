import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGsv } from '../model/message-gsv';

export class NmeaGpsGsv extends NmeaGps {
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

        const size = splitted.length;
        const remaining = (size - 3) % 4;
        const hasSignalId = remaining === 1;
        const svNum = Math.floor((size - 3) / 4);

        if (!(remaining === 0 || remaining === 1) || svNum < 0 || svNum > 4) {
            throw new Error(`Parse Error. (message=${message})`);
        }

        return new MessageGsv(tid, mid, splitted);
    }
}
