import { NmeaGps } from './nmea-gps';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGsa } from '../model/message-gsa';
import { MessageGsaSatellite } from '../model/message-gsa-satellite';

export class NmeaGpsGsa extends NmeaGps {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_BASE_NUM = 6;
    public static readonly FIELD_SAT_NUM = 1;
    public static readonly FIELD_SAT_OFFSET = 2;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GSA;
    }

    valicateFieldNum(fieldNum: number): boolean {
        const repeatedFieldNum = fieldNum - NmeaGpsGsa.FIELD_BASE_NUM;
        if (repeatedFieldNum < 0) {
            return false;
        }

        // TIPS: NmeaGpsGsa.FIELD_SAT_NUM === 1 だと無意味なのでコメントアウト
        // if (0 !== repeatedFieldNum % NmeaGpsGsa.FIELD_SAT_NUM) {
        //     return false;
        // }

        return true;
    }

    /**
     * parse data
     * @param tid talker ID
     * @param mid message ID
     * @param message message
     */
    parse(tid: TalkerId, mid: MessageId, message: string): Message {
        const splitted = message.split(NmeaGps.FIELD_DELIMITER);
        if (!this.valicateFieldNum(splitted.length)) {
            throw new Error(`Parse Error. (message=${message})`);
        }

        const repeatedFieldNum = splitted.length - NmeaGpsGsa.FIELD_BASE_NUM;
        const repeatedBlockNum = repeatedFieldNum / NmeaGpsGsa.FIELD_SAT_NUM;
        const offset = NmeaGpsGsa.FIELD_SAT_OFFSET;
        const svList: MessageGsaSatellite[] = [];
        for (let i = 0; i < repeatedBlockNum; i++) {
            const sat = {
                svid: Number.parseFloat(splitted[offset + i * NmeaGpsGsa.FIELD_SAT_NUM]),
            } as MessageGsaSatellite;
            svList.push(sat);
        }

        return {
            talkerId: tid,
            messageId: mid,
            opMode: splitted[0],
            navMode: Number.parseInt(splitted[1], 10),
            svid: svList,
            PDOP: Number.parseFloat(splitted[splitted.length - 4]),
            HDOP: Number.parseFloat(splitted[splitted.length - 3]),
            VDOP: Number.parseFloat(splitted[splitted.length - 2]),
            systemId: Number.parseFloat(splitted[splitted.length - 1])
        } as MessageGsa;
    }
}
