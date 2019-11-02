import { NmeaStd } from './nmea-std';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGrs } from '../model/message-grs';
import { MessageGrsResidual } from '../model/message-grs-residual';

export class NmeaStdGrs extends NmeaStd {

    /**
     * Field parameter number.
     */
    public static readonly FIELD_BASE_NUM = 4;
    public static readonly FIELD_SAT_NUM = 1;
    public static readonly FIELD_SAT_OFFSET = 2;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GRS;
    }

    valicateFieldNum(fieldNum: number): boolean {
        const repeatedFieldNum = fieldNum - NmeaStdGrs.FIELD_BASE_NUM;
        if (repeatedFieldNum < 0) {
            return false;
        }

        // TIPS: NmeaStdGrs.FIELD_SAT_NUM === 1 だと無意味なのでコメントアウト
        // if (0 !== repeatedFieldNum % NmeaStdGrs.FIELD_SAT_NUM) {
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
        const splitted = message.split(NmeaStd.FIELD_DELIMITER);
        if (!this.valicateFieldNum(splitted.length)) {
            throw new Error(`Parse Error. (message=${message})`);
        }

        const repeatedFieldNum = splitted.length - NmeaStdGrs.FIELD_BASE_NUM;
        const repeatedBlockNum = repeatedFieldNum / NmeaStdGrs.FIELD_SAT_NUM;
        const offset = NmeaStdGrs.FIELD_SAT_OFFSET;
        const residualList: MessageGrsResidual[] = [];
        for (let i = 0; i < repeatedBlockNum; i++) {
            const sat = {
                residual: Number.parseFloat(splitted[offset + i * NmeaStdGrs.FIELD_SAT_NUM]),
            } as MessageGrsResidual;
            residualList.push(sat);
        }

        return {
            talkerId: tid,
            messageId: mid,
            time: splitted[0],
            mode: Number.parseInt(splitted[1], 10),
            residual: residualList,
            systemId: Number.parseInt(splitted[splitted.length - 2], 10),
            signalId: Number.parseInt(splitted[splitted.length - 1], 10)
        } as MessageGrs;
    }
}
