import { NmeaStd } from './nmea-std';
import { MessageId } from '../model/message-id.enum';
import { TalkerId } from '../model/talker-id.enum';
import { Message } from '../model/message';
import { MessageGsv } from '../model/message-gsv';
import { MessageGsvSatellite } from '../model/message-gsv-satellite';

export class NmeaStdGsv extends NmeaStd {

    /**
     * 3 or 4(+signalId)
     */
    public static readonly FIELD_BASE_NUM = 4;
    public static readonly FIELD_SAT_NUM = 4;
    public static readonly FIELD_SAT_OFFSET = 3;

    private hasSignalId = false;

    /**
     * validate data
     * @param mid message ID.
     */
    validateMessageId(mid: MessageId): boolean {
        return mid === MessageId.GSV;
    }

    validateFieldNum(fieldNum: number): boolean {
        return this.validateFieldNumWithoutSignalId(fieldNum) ||
            this.validateFieldNumWithSignalId(fieldNum);
    }

    validateFieldNumWithSignalId(fieldNum: number): boolean {
        const repeatedFieldNum = fieldNum - NmeaStdGsv.FIELD_BASE_NUM;
        // console.log(`${fieldNum},${NmeaStdGsv.FIELD_BASE_NUM},${repeatedFieldNum}`);
        if (repeatedFieldNum < 0) {
            return false;
        }

        if (0 !== repeatedFieldNum % NmeaStdGsv.FIELD_SAT_NUM) {
            return false;
        }

        this.hasSignalId = true;

        return true;
    }

    validateFieldNumWithoutSignalId(fieldNum: number): boolean {
        const repeatedFieldNum = fieldNum - NmeaStdGsv.FIELD_BASE_NUM + 1;
        // console.log(`${fieldNum},${NmeaStdGsv.FIELD_BASE_NUM},${repeatedFieldNum}`);
        if (repeatedFieldNum < 0) {
            return false;
        }

        if (0 !== repeatedFieldNum % NmeaStdGsv.FIELD_SAT_NUM) {
            return false;
        }

        this.hasSignalId = false;

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
        if (!this.validateFieldNum(splitted.length)) {
            throw new Error(`Parse Error. (message=${message})`);
        }

        const repeatedFieldNum = splitted.length - NmeaStdGsv.FIELD_BASE_NUM;
        const repeatedBlockNum = repeatedFieldNum / NmeaStdGsv.FIELD_SAT_NUM;
        const offset = NmeaStdGsv.FIELD_SAT_OFFSET;
        const svList: MessageGsvSatellite[] = [];
        for (let i = 0; i < repeatedBlockNum; i++) {
            const sat = {
                svid: Number.parseFloat(splitted[offset + i * NmeaStdGsv.FIELD_SAT_NUM] + 0),
                elv: Number.parseFloat(splitted[offset + i * NmeaStdGsv.FIELD_SAT_NUM] + 1),
                az: Number.parseFloat(splitted[offset + i * NmeaStdGsv.FIELD_SAT_NUM] + 2),
                cno: Number.parseFloat(splitted[offset + i * NmeaStdGsv.FIELD_SAT_NUM] + 3)
            } as MessageGsvSatellite;
            svList.push(sat);
        }

        return {
            talkerId: tid,
            messageId: mid,
            numMsg: Number.parseInt(splitted[0], 10),
            msgNum: Number.parseInt(splitted[1], 10),
            numSV: Number.parseInt(splitted[2], 10),
            sv: svList,
            signalId: this.hasSignalId ? Number.parseInt(splitted[splitted.length - 1], 10) : undefined
        } as MessageGsv;
    }
}
